<template>
  <div>
    <p class="mt-3 mb-3 text-light">Weather Details...</p>
    <div class="ms-3">
      <h6 class="mb-4">THUNDERSTORM WITH LIGHT DRIZZLE</h6>
      <div class="d-flex flex-column">
        <WeatherMetric
          v-for="metric in metrics"
          :key="metric.label"
          :label="metric.label"
          :value="metric.value"
          :icon-src="metric.iconSrc"
          :icon-class="metric.iconClass"
          :icon-style="metric.iconStyle"
          :icon-alt="metric.iconAlt"
          :icon-height="metric.iconHeight"
          :icon-width="metric.iconWidth"
          :class="metric.class"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import WeatherMetric from './WeatherMetric.vue';
import { computed } from 'vue';
const props = defineProps({
  temperatureMax: String,  
  temperatureMin: String,
  humidity: String,
  cloudy: String,
  wind: String,
  pressure: String,
  briefInformation: String
});

const metrics = computed(() =>  [
  {
    label: 'Temp max',
    value: props.temperatureMax , 
    iconSrc: '/temp_max.svg',
    iconClass: 'd-flex align-self-center me-5 mb-2',
    iconStyle: 'margin-top: -5px;',
    iconAlt: 'Temp max',
  },
  {
    label: 'Temp min',
    value: props.temperatureMin, 
    iconSrc: '/temp_min.svg',
    iconClass: 'd-flex align-self-center me-5 mb-2',
    iconStyle: 'margin-top: -5px;',
    iconAlt: 'Temp min',
  },
  {
    label: 'Humidity',
    value: props.humidity, 
    iconSrc: '/outline.svg',
    iconClass: 'd-flex align-self-center me-5 mb-2',
    iconStyle: 'margin-top: -5px;',
    iconAlt: 'Humidity',
  },
  {
    label: 'Cloudy',
    value: props.cloudy, 
    iconSrc: '/cloudy.svg',
    iconClass: 'd-flex align-self-center me-5 mb-2',
    iconStyle: 'margin-top: -5px;',
    iconAlt: 'Cloudy',
  },
  {
    label: 'Wind',
    value: props.wind,
    iconSrc: '/wind.svg',
    iconClass: 'd-flex align-self-center me-5 mb-2',
    iconStyle: 'margin-top: -5px;',
    iconAlt: 'Wind',
  },
  {
    label: 'Pressure',
    value: props.pressure,
    iconSrc: '/preasure.svg',
    iconClass: 'd-flex align-self-center me-5 mb-2 weather-icon',
    iconStyle: 'margin-top: -5px;',
    iconAlt: 'Pressure',
    iconHeight: '30',
    iconWidth: '30',
    class: 'mb-5',
  },
]);
</script>