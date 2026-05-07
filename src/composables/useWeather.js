import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useWeather() {
  const toast = useToast()
  const autoUpdateInterval = ref(null)
  const locationName = ref('Samara')

  const weatherData = reactive({
    location: '',
    time: '',
    weatherIcon: '',
    temperature: '',
    temperatureMax: '',
    temperatureMin: '',
    windSpeed: '',
    windDirection: '',
    windDegree: '',
    humidity: '',
    cloudy: '',
    pressure: '',
    dynamicStyle: '',
    hours: [],
    precip: '',
    sunrise: '',
    sunset: '',
    condition: '',
  })

  const isCoordinatesInput = (input) => {
    const coordRegex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/
    return coordRegex.test(input.trim())
  }

  const fetchForecast = async () => {
    try {
      if (!locationName?.value) {
        toast.error('Location name or coordinates not specified')
        return
      }

      let params = {
        key: import.meta.env.VITE_WEATHERAPI_KEY,
        days: 1,
        aqi: 'no',
        alerts: 'no',
      }

      const inputValue = locationName.value.trim()

      if (!inputValue) {
        toast.error('Please enter a location name or coordinates')
        return
      }

      if (isCoordinatesInput(inputValue)) {
        const coords = inputValue.split(',').map((coord) => coord.trim())
        if (coords.length !== 2) {
          toast.error('Invalid coordinates format. Use "latitude, longitude"')
          return
        }
        const [lat, lon] = coords
        if (isNaN(lat) || isNaN(lon)) {
          toast.error('Coordinates must be numbers')
          return
        }
        if (lat < -90 || lat > 90) {
          toast.error('Latitude must be between -90 and 90 degrees')
          return
        }
        if (lon < -180 || lon > 180) {
          toast.error('Longitude must be between -180 and 180 degrees')
          return
        }
        params.q = `${lat},${lon}`
      } else {
        if (inputValue.length < 2) {
          toast.error('Location name is too short')
          return
        }
        if (inputValue.length > 100) {
          toast.error('Location name is too long')
          return
        }
        if (/[<>]/.test(inputValue)) {
          toast.error('Location name contains invalid characters')
          return
        }
        params.q = inputValue
      }

      const { data } = await axios.get('https://api.weatherapi.com/v1/forecast.json', { params })

      weatherData.temperatureMax = `${data.forecast.forecastday[0].day.maxtemp_c}°`
      weatherData.temperatureMin = `${data.forecast.forecastday[0].day.mintemp_c}°`
      weatherData.sunrise = data.forecast.forecastday[0].astro.sunrise
      weatherData.sunset = data.forecast.forecastday[0].astro.sunset
      weatherData.location = data.location.name
      weatherData.time = data.location.localtime
      weatherData.weatherIcon = data.current.condition.icon
      weatherData.temperature = `${data.current.temp_c}°`
      weatherData.windSpeed = `${(data.current.wind_kph / 3.6).toFixed(1)} m/s`
      weatherData.windDirection = data.current.wind_dir
      weatherData.windDegree = data.current.wind_degree
      weatherData.humidity = `${data.current.humidity} %`
      weatherData.cloudy = `${data.current.cloud} %`
      weatherData.pressure = `${data.current.pressure_mb} hPa`
      weatherData.condition = data.current.condition.text
      weatherData.dynamicStyle = `margin-top: -5px; transform: rotate(${weatherData.windDegree + 90}deg);`
      weatherData.precip = data.current.precip_mm

      const currentHour = new Date(weatherData.time).getHours()

      weatherData.hours = Array.from({ length: 24 - currentHour }, (_, i) => {
        const hourData = data.forecast.forecastday[0].hour[currentHour + i]
        return {
          time: hourData.time.slice(-5),
          condition: hourData.condition.text,
          temperature: `${hourData.temp_c}°`,
          iconSrc: hourData.condition.icon,
        }
      })
      locationName.value = ''

    } catch (error) {
      console.error('Ошибка при получении данных:', error)
      toast.error('Failed to get weather data')
    }
  }

  const getTimeOfDay = () => {
    const sunrise = weatherData.sunrise
    const sunset = weatherData.sunset
    if (!sunrise || !sunset || !weatherData.time) return 'day'

    const currentTime = new Date(weatherData.time)
    if (isNaN(currentTime.getTime())) return 'day'

    const sunriseTime = new Date(`2000-01-01 ${sunrise}`).getTime()
    const sunsetTime = new Date(`2000-01-01 ${sunset}`).getTime()
    if (isNaN(sunriseTime) || isNaN(sunsetTime)) return 'day'

    const current = new Date(`2000-01-01 ${currentTime.toLocaleTimeString()}`).getTime()
    const oneHour = 3600000

    if (current >= sunriseTime - oneHour && current < sunriseTime) return 'dawn'
    if (current >= sunriseTime && current < sunriseTime + oneHour) return 'sunrise'
    if (current >= sunriseTime + oneHour && current < sunsetTime - oneHour) return 'day'
    if (current >= sunsetTime - oneHour && current < sunsetTime) return 'golden_hour'
    if (current >= sunsetTime && current < sunsetTime + oneHour) return 'twilight'
    if (current >= sunsetTime + oneHour || current < sunriseTime - oneHour) return 'night'
  }

  const getWeatherCondition = () => {
    const { condition, precip, cloudy } = weatherData

    if (!condition) return 'clearly'

    if (condition.toLowerCase().includes('thunderstorm')) return 'thunderstorm'
    if (condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('sleet')) return 'snow'
    if (condition.toLowerCase().includes('hail')) return 'hail'
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle') || precip > 0) {
      return condition.toLowerCase().includes('freezing') ? 'freezing_rain' : 'rain'
    }
    if (condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('mist')) return 'fog'
    if (condition.toLowerCase().includes('sand') || condition.toLowerCase().includes('dust')) return 'sandstorm'
    if (cloudy > 80) return 'overcast'
    if (cloudy > 40) return 'cloudy'
    if (cloudy > 20) return 'partly_cloudy'
    return 'clearly'
  }

  const getBackgroundImage = computed(() => {
    let timeOfDay = getTimeOfDay()
    let weatherCondition = getWeatherCondition()
    let basePath = '/WeatherApp/dynamicWeather'

    return `${basePath}/${timeOfDay}-${weatherCondition}.jpg`
  })

  onMounted(() => {
    fetchForecast()
    autoUpdateInterval.value = setInterval(fetchForecast, 1800000)
  })

  onBeforeUnmount(() => {
    clearInterval(autoUpdateInterval.value)
  })

  return {
    locationName,
    weatherData,
    fetchForecast,
    getBackgroundImage,
  }
}
