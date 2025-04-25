<template>
  <div class="weather-bg text-light">
    <Header />
    <div class="blur-right border border-secondary border-start border-1 border-opacity-10">
      <div class="ms-5 mt-3 mb-3">
        <SearchBar></SearchBar>
        <WeatherDetails></WeatherDetails>
        <div class="border-top me-5">
          <h4 class="mt-3 mb-5">Today's Weather Forecast...</h4>
          <WeatherForecastList :forecasts="forecasts"></WeatherForecastList>
        </div>
      </div>
    </div>
    <WeatherFooter></WeatherFooter>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import SearchBar from './components/SearchBar.vue';
import WeatherDetails from './components/WeatherDetails.vue';
import WeatherFooter from './components/WeatherFooter.vue';
import WeatherForecastList from './components/WeatherForecastList.vue';

const forecasts = [
  { time: '9:00', condition: 'Snow', temperature: '19', iconSrc: '/Snow.svg' },
  { time: '10:00', condition: 'Snow', temperature: '18', iconSrc: '/Snow.svg' },
  { time: '11:00', condition: 'Snow', temperature: '17', iconSrc: '/Snow.svg' },
  { time: '12:00', condition: 'Snow', temperature: '17', iconSrc: '/Snow.svg' },
];
</script>

<style scoped>
.weather-bg {
  position: relative;
  background-image: url('bg-weather.svg');
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