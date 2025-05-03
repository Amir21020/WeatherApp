<template>
  <div class="d-flex flex-column forecast-container">
    <WeatherForecast
      v-for="forecast in forecasts"
      :key="forecast.time"
      :time="forecast.time"
      :condition="forecast.condition"
      :temperature="forecast.temperature"
      :icon-src="forecast.iconSrc"
    />
  </div>
</template>


<script setup>
import WeatherForecast from './WeatherForecast.vue';


defineProps({
  forecasts: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>


<style scoped>
.forecast-container {
  flex-grow: 1;
  max-height: 200px;
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