<template>
    <div class="input-group pe-5">
      <input
        type="text"
        class="form-control weather-input text-light"
        placeholder="Search Location..."
        aria-label="Search city"
      />
      <button class="btn bg-transparent border-light border-opacity-50 border-start-0">
        <img src="/fa_search.svg" alt="Search" class="search-icon" />
      </button>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .weather-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 0;
  }
  
  .weather-input::placeholder {
    color: #f8f9fa;
    opacity: 75%;
  }
  
  .weather-input:focus {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: none;
  }
  
  .btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 0;
  }
  
  .btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .search-icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1) opacity(0.8);
  }
  </style>