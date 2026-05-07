<template>
  <div class="weather-bg text-light" :style="{ backgroundImage: `url(${getBackgroundImage})` }">
    <Header />
    
    <div class="blur-right border border-secondary border-start border-1 border-opacity-10">
      <div class="ms-3 ms-md-5 mt-3 mb-3">
        <SearchBar v-model="locationName" @search="() => fetchForecast()"></SearchBar>
        
        <WeatherDetails
          :temperatureMax="weatherData.temperatureMax"
          :temperatureMin="weatherData.temperatureMin"
          :humidity="weatherData.humidity"
          :cloudy="weatherData.cloudy"
          :wind="weatherData.windSpeed"
          :pressure="weatherData.pressure"
          :condition="weatherData.condition"
          :windStyle="weatherData.dynamicStyle"
        ></WeatherDetails>
        
        <div class="border-top me-3 me-md-5">
          <h5 class="mt-3 mb-4">Today's Weather Forecast...</h5>
          <WeatherForecastList :forecasts="weatherData.hours"></WeatherForecastList>
        </div>
      </div>
    </div>

    <WeatherFooter
      :temperature="weatherData.temperature"
      :location="weatherData.location"
      :time="weatherData.time"
      :weatherIcon="weatherData.weatherIcon"
      :weatherCondition="weatherData.condition"
    ></WeatherFooter>
  </div>
</template>

<script setup>
import SearchBar from './components/SearchBar.vue';
import Header from './components/Header.vue';
import WeatherDetails from './components/WeatherDetails.vue';
import WeatherFooter from './components/WeatherFooter.vue';
import WeatherForecastList from './components/WeatherForecastList.vue';
import { useWeather } from './composables/useWeather.js';

const { locationName, weatherData, fetchForecast, getBackgroundImage } = useWeather();
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
  transition: background-image 0.5s ease-in-out; /* Плавная смена фона */
}

.blur-right {
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  backdrop-filter: blur(5px);
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3));
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .blur-right { width: 50%; }
}

@media (min-width: 1200px) {
  .blur-right { width: 30%; }
}

@media (max-width: 767px) {
  .weather-bg { padding: 0.5rem; }
}
</style>