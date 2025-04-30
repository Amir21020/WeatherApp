<template>
  <div class="border-top me-5">
    <h4 class="mt-4 mb-3">Today's Weather Forecast...</h4>
    <div class="d-flex flex-column forecast-container">
      <WeatherForecast
        v-for="forecast in hours"
        :key="forecast.time"
        :time="forecast.time"
        :condition="forecast.condition"
        :temperature="forecast.temperature"
        :icon-src="forecast.iconSrc"
      />
    </div> 
  </div>
  
</template>

<script setup>
  import WeatherForecast from './WeatherForecast.vue';

  defineProps({
    hours: {
      type: Array,
      required: true,
      default: () => []
    }
  });
</script>

<style scoped>
  .forecast-container {
    flex-grow: 1;
    max-height: 475px; 
    overflow: auto;
    padding-right: 12px; 
    scroll-behavior: smooth;
  }

  .forecast-container::-webkit-scrollbar {
    width: 8px;
  }
  .forecast-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  .forecast-container::-webkit-scrollbar-track {
    background: transparent;
  }
</style>