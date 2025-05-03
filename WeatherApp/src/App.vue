<template>
  <div class="weather-bg text-light" :style="{ backgroundImage: `url(${getBackgroundImage})` }">
    <Header />
    <div class="blur-right border border-secondary border-start border-1 border-opacity-10">
      <div class="ms-5 mt-3 mb-3">
        <SearchBar v-model="locationName" @search="fetchForecast"></SearchBar>
        <WeatherDetails
          :temperatureMax="weatherData.temperatureMax"
          :temperatureMin="weatherData.temperatureMin"
          :humidity="weatherData.humidity"
          :cloudy="weatherData.cloudy"
          :wind="weatherData.windSpeed"
          :pressure="weatherData.pressure"
        ></WeatherDetails>
        <div class="border-top me-5">
          <h4 class="mt-3 mb-5">Today's Weather Forecast...</h4>
          <WeatherForecastList :forecasts="weatherData.hours"></WeatherForecastList>
        </div>
      </div>
    </div>
    <WeatherFooter
      :temperature="weatherData.temperature"
      :location="weatherData.location"
      :time="weatherData.time"
      :weatherIcon="weatherData.weatherIcon"
    ></WeatherFooter>
  </div>
</template>

<script setup>
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import Header from './components/Header.vue';
import WeatherDetails from './components/WeatherDetails.vue';
import WeatherFooter from './components/WeatherFooter.vue';
import WeatherForecastList from './components/WeatherForecastList.vue';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const autoUpdateInterval = ref(null);
const locationName = ref('Samara');
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
  briefInformation: '',
  dynamicStyle: '',
  tempIcon: '',
  hours: [],
  styleImg: '',
  precip: '',
  sunrise: '',
  sunset: '',
  condition: '',
});

const isCoordinatesInput = (input) => {
  const coordRegex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
  return coordRegex.test(input.trim());
};

const fetchForecast = async () => {
  try {
    if (!locationName?.value) {
      toast.error('Location name or coordinates not specified');
      return;
    }

    let params = {
      key: 'b09eef2d7f6742f480565806252504',
      days: 1,
      aqi: 'no',
      alerts: 'no',
    };

    const inputValue = locationName.value.trim();

    if (!inputValue) {
      toast.error('Please enter a location name or coordinates');
      return;
    }

    if (isCoordinatesInput(inputValue)) {
      const coords = inputValue.split(',').map((coord) => coord.trim());
      if (coords.length !== 2) {
        toast.error('Invalid coordinates format. Use "latitude, longitude"');
        return;
      }
      const [lat, lon] = coords;
      if (isNaN(lat) || isNaN(lon)) {
        toast.error('Coordinates must be numbers');
        return;
      }
      if (lat < -90 || lat > 90) {
        toast.error('Latitude must be between -90 and 90 degrees');
        return;
      }
      if (lon < -180 || lon > 180) {
        toast.error('Longitude must be between -180 and 180 degrees');
        return;
      }
      params.q = `${lat},${lon}`;
    } else {
      if (inputValue.length < 2) {
        toast.error('Location name is too short');
        return;
      }
      if (inputValue.length > 100) {
        toast.error('Location name is too long');
        return;
      }
      if (/[<>]/.test(inputValue)) {
        toast.error('Location name contains invalid characters');
        return;
      }
      params.q = inputValue;
    }

    const { data } = await axios.get('https://api.weatherapi.com/v1/forecast.json', { params });
    console.log('API response:', data); 

    weatherData.temperatureMax = `${data.forecast.forecastday[0].day.maxtemp_c}°`;
    weatherData.temperatureMin = `${data.forecast.forecastday[0].day.mintemp_c}°`;
    weatherData.sunrise = data.forecast.forecastday[0].astro.sunrise;
    weatherData.sunset = data.forecast.forecastday[0].astro.sunset;
    weatherData.location = data.location.name;
    weatherData.time = data.location.localtime;
    weatherData.weatherIcon = data.current.condition.icon;
    weatherData.temperature = `${data.current.temp_c}°`;
    weatherData.windSpeed = `${(data.current.wind_kph / 3.6).toFixed(1)} m/s`;
    weatherData.windDirection = data.current.wind_dir;
    weatherData.windDegree = data.current.wind_degree;
    weatherData.humidity = `${data.current.humidity} %`;
    weatherData.cloudy = `${data.current.cloud} %`;
    weatherData.pressure = `${data.current.pressure_mb} hPa`;
    weatherData.condition = data.current.condition.text; 
    weatherData.briefInformation = data.current.condition.text; 
    weatherData.dynamicStyle = `margin-top: -5px; transform: rotate(${weatherData.windDegree + 90}deg);`;
    weatherData.tempIcon = data.current.temp_c > 0 ? '/temp_max.svg' : '/temp_min.svg';
    weatherData.precip = data.current.precip_mm;

    const currentHour = new Date(weatherData.time).getHours();

    weatherData.hours = Array.from({ length: 24 - currentHour }, (_, i) => {
      const hourData = data.forecast.forecastday[0].hour[currentHour + i];
      return {
        time: hourData.time.slice(-5),
        condition: hourData.condition.text,
        temperature: `${hourData.temp_c}°`,
        iconSrc: hourData.condition.icon,
      };
    });
    locationName.value = '';

  } catch (error) {
    console.error('Error fetching weather data:', error);
    toast.error('Failed to get weather data');
  }
};

const getTimeOfDay = () => {
  const sunrise = weatherData.sunrise;
  const sunset = weatherData.sunset;
  const currentTime = new Date(weatherData.time).toLocaleTimeString();

  if (!sunrise || !sunset || !currentTime) return 'day'; 

  const sunriseTime = new Date(`2000-01-01 ${sunrise}`).getTime();
  const sunsetTime = new Date(`2000-01-01 ${sunset}`).getTime();
  const current = new Date(`2000-01-01 ${currentTime}`).getTime();

  const oneHour = 3600000;

  if (current >= sunriseTime - oneHour && current < sunriseTime) return 'dawn';
  if (current >= sunriseTime && current < sunriseTime + oneHour) return 'sunrise';
  if (current >= sunriseTime + oneHour && current < sunsetTime - oneHour) return 'day';
  if (current >= sunsetTime - oneHour && current < sunsetTime) return 'golden_hour';
  if (current >= sunsetTime && current < sunsetTime + oneHour) return 'twilight';
  if (current >= sunsetTime + oneHour || current < sunriseTime - oneHour) return 'night';
};

const getWeatherCondition = () => {
  const { condition, precip, cloudy } = weatherData;

  if (!condition) return 'clearly';

  if (condition.toLowerCase().includes('thunderstorm')) return 'thunderstorm';
  if (condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('sleet')) return 'snow';
  if (condition.toLowerCase().includes('hail')) return 'hail';
  if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle') || precip > 0) {
    return condition.toLowerCase().includes('freezing') ? 'freezing_rain' : 'rain';
  }
  if (condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('mist')) return 'fog';
  if (condition.toLowerCase().includes('sand') || condition.toLowerCase().includes('dust')) return 'sandstorm';
  if (cloudy > 80) return 'overcast';
  if (cloudy > 40) return 'cloudy';
  if (cloudy > 20) return 'partly_cloudy';
  return 'clearly';
};

const getBackgroundImage = (() => {
  let timeOfDay = getTimeOfDay();
  let weatherCondition = getWeatherCondition();
  let basePath = '/WeatherApp/dynamicWeather';


  return `${basePath}/${timeOfDay}-${weatherCondition}.jpg`;
});

onMounted(() => {
  fetchForecast().then(() => {
    console.log('fetchForecast completed, getBackgroundImage:', getBackgroundImage.value);
  });
  autoUpdateInterval.value = setInterval(fetchForecast, 1800000);
  getBackgroundImage(); 
});

onBeforeUnmount(() => {
  clearInterval(autoUpdateInterval.value);
});
</script>
<style scoped>
.weather-bg {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
}

.blur-right {
  top: 0;
  right: 0;
  height: 100%;
  width: 30%;
  position: absolute;
  backdrop-filter: blur(5px);
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3));
  display: flex;
  flex-direction: column;
}
</style>