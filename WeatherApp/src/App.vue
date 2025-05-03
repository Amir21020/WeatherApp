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
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
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
      toast.error('Не указано название места или координаты');
      return;
    }

    let params = {
      key: 'b09eef2d7f6742f480565806252504',
      days: 1,
      aqi: 'no',
      alerts: 'no',
    };

    onMounted(() => {
      fetchForecast();
    });

    if (!inputValue) {
      toast.error('Введите название места или координаты');
      return;
    }

    if (isCoordinatesInput(inputValue)) {
      const coords = inputValue.split(',').map((coord) => coord.trim());
      if (coords.length !== 2) {
        toast.error('Неверный формат координат. Используйте "широта, долгота"');
        return;
      }
      const [lat, lon] = coords;
      if (isNaN(lat) || isNaN(lon)) {
        toast.error('Координаты должны быть числами');
        return;
      }
      if (lat < -90 || lat > 90) {
        toast.error('Широта должна быть между -90 и 90 градусами');
        return;
      }
      if (lon < -180 || lon > 180) {
        toast.error('Долгота должна быть между -180 и 180 градусами');
        return;
      }
      params.q = `${lat},${lon}`;
    } else {
      if (inputValue.length < 2) {
        toast.error('Название места слишком короткое');
        return;
      }
      if (inputValue.length > 100) {
        toast.error('Название места слишком длинное');
        return;
      }
      if (/[<>]/.test(inputValue)) {
        toast.error('Название места содержит недопустимые символы');
        return;
      }
      params.q = inputValue;
    }

    const { data } = await axios.get('http://api.weatherapi.com/v1/forecast.json', { params });
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
    locationName.value = ''

  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    toast.error('Не удалось получить данные о погоде');
  }
  
  .search-icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1) opacity(0.8);
  }
  if (condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('mist')) return 'fog';
  if (condition.toLowerCase().includes('sand') || condition.toLowerCase().includes('dust')) return 'sandstorm';
  if (cloudy > 80) return 'overcast';
  if (cloudy > 40) return 'cloudy';
  if (cloudy > 20) return 'partly_cloudy';
  return 'clearly';
};

const getBackgroundImage = computed(() => {
  let timeOfDay = getTimeOfDay();
  let weatherCondition = getWeatherCondition();
  let basePath = '/dynamicWeather';


  return `${basePath}/${timeOfDay}-${weatherCondition}.jpg`;
});

onMounted(() => {
  fetchForecast().then(() => {
    console.log('fetchForecast completed, getBackgroundImage:', getBackgroundImage.value);
  });
  autoUpdateInterval.value = setInterval(fetchForecast, 1800000); 
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