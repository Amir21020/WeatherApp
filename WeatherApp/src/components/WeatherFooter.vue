<template>
    <div class="bottom-text" style="margin: 5%;">
      <div class="d-flex align-items-start ms-5">
        <p class="me-3" style="font-size: 8rem; line-height: 1;">16°</p>
        <div class="d-flex flex-column align-items-start" style="line-height: 1.45;">
          <p class="mb-0" style="font-size: 4rem;">London</p>
          <p class="mb-0" style="font-size: 1.15rem;">06:09 - Monday, 9 Sep '23</p>
        </div>
        <img src="/cloudy.svg" alt="Cloudy" class="ms-3 align-self-start" style="width: 80px; margin-top: 2.3%;">
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .bottom-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
  }
  </style>