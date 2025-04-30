<template>
  <div>
    <h4 class="mt-4 mb-3">Information about the current weather...</h4>
    <h5 class="ms-2 mb-4">Overall: {{ briefInformation }}</h5>
    <div class="ms-4">      
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-items-center">
          <p class="d-flex flex-fill align-items-center" :class="{ 'me-2 mb-0': isPressure }">Temperature</p>
          <p class="me-3 align-items-center" :class="{ 'me-2 mb-0': isPressure }">{{ temperature }}</p>
          <img
            :src='tempIcon'
            alt='Temp max'
            class='d-flex align-self-center me-5 mb-2'
            style='margin-top: -5px;'
          >
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-items-center">
          <p class="d-flex flex-fill align-items-center" :class="{ 'me-2 mb-0': isPressure }">Cloud cover</p>
          <p class="me-3 align-items-center" :class="{ 'me-2 mb-0': isPressure }">{{ cloud }}</p>
          <img
            src='/cloudy.svg'
            alt='Cloudy'
            class='d-flex align-self-center me-5 mb-2'
            style='margin-top: -5px;'
          >
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-items-center">
          <p class="d-flex flex-fill align-items-center" :class="{ 'me-2 mb-0': isPressure }">Humidity</p>
          <p class="me-3 align-items-center" :class="{ 'me-2 mb-0': isPressure }">{{ humidity }}</p>
          <img
            src='/outline.svg'
            alt='Cloudy'
            class='d-flex align-self-center me-5 mb-2'
            style='margin-top: -5px;'
          >
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-items-center">
          <p class="d-flex flex-fill align-items-center" :class="{ 'me-2 mb-0': isPressure }">Wind</p>
          <p class="me-3 align-items-center" :class="{ 'me-2 mb-0': isPressure }"></p>
          <img
            src='/direction.png'
            alt='Wind'
            class='d-flex align-self-center me-3 mb-2'
            :style='dynamicStyle'
          >
          <p class="me-3 align-items-center" :class="{ 'me-2 mb-0': isPressure }">{{ windSpeed }}</p>
          <img
            src='/wind.svg'
            alt='Wind'
            class='d-flex align-self-center me-5 mb-2'
            style='margin-top: -5px;'
          >
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-items-center">
          <p class="d-flex flex-fill align-items-center" :class="{ 'me-2 mb-0': isPressure }">Pressure</p>
          <p class="me-3 align-items-center" :class="{ 'me-2 mb-0': isPressure }">{{ pressure }}</p>
          <img
            src='/preasure.svg'
            alt='Pressure'
            class='d-flex align-self-center me-5 mb-2 weather-icon'
            style='margin-top: -5px;'
            height='30'
            width='30'
          >
        </div>
      </div>      
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    'temperature': String,
    'windSpeed': String,
    'windDirection': String,
    'humidity': String, 
    'cloud': String, 
    'pressure': String,
    'briefInformation': String,
    'dynamicStyle': String,
    'tempIcon': String
  });

  const isPressure = false
</script>

<style scoped>
</style>