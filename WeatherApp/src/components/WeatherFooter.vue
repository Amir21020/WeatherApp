<template>
  <div class="bottom-text">
    <div class="d-flex align-items-start ms-3 ms-md-5 weather-footer-content">
      <p class="me-3 weather-temp">{{ temperature }}</p>
      <div class="d-flex flex-column align-items-start weather-info">
        <p class="mb-0 weather-location">{{ location }}</p>
        <p class="mb-0 weather-time">{{ formattedTime }}</p>
      </div>
      <img
       :src="weatherIcon" :alt="weatherCondition" class="ms-3 align-self-start weather-icon-lg">
    </div>
  </div>
</template>

<script setup>
import { toRef } from 'vue';
import { useClock } from '../composables/useClock.js';

const props = defineProps({
  temperature: {
    type: String,
    default: '16°',
  },
  location: {
    type: String,
    default: 'London',
  },
  time: {
    type: String,
    default: '2023-09-09 06:09',
  },
  weatherIcon: {
    type: String,
    default: '/cloudy.svg',
  },
  weatherCondition: {
    type: String,
    default: 'Cloudy',
  },
});

const { formattedTime } = useClock(toRef(props, 'time'));
</script>

<style scoped>
.bottom-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
}

.weather-temp {
  font-size: 4rem;
  line-height: 1;
}

.weather-location {
  font-size: 2rem;
}

.weather-time {
  font-size: 1rem;
}

.weather-icon-lg {
  width: 60px;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .weather-temp {
    font-size: 8rem;
  }

  .weather-location {
    font-size: 4rem;
  }

  .weather-time {
    font-size: 1.15rem;
  }

  .weather-icon-lg {
    width: 80px;
    margin-top: 2.3%;
  }
}
</style>