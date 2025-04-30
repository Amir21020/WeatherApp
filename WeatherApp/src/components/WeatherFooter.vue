<template>
    <div class="bottom-text" style="margin: 5%;">
      <div class="d-flex align-items-start ms-5">
        <p class="me-3" style="font-size: 7.5rem; line-height: 1;">{{ temperature }}</p>
        <div class="d-flex flex-column align-items-start" style="line-height: 1.45;">
          <p class="mb-0" style="font-size: 3.8rem;">{{ location }}</p>
          <p class="mb-0" style="font-size: 1.15rem;">{{ time }}</p>
        </div>
        <img :src= weatherIcon alt="Cloudy" class="ms-3 align-self-start" style="width: 80px; margin-top: 2.3%;">
      </div>
    </div>
  </template>
  
  <script setup>
    defineProps({
      'location': String,
      'time': String,
      'weatherIcon': String,
      'temperature': String
    });
  </script>
  
  <style scoped>
    .bottom-text {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
    }
  </style>