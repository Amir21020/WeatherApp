<template>
    <div class="d-flex flex-row align-items-center weather-metric-row">
      <span class="metric-label">{{ label }}</span>
      <span class="metric-value">{{ value }}</span>
      <img
        :src="iconSrc"
        :alt="iconAlt || label"
        :class="iconClass"
        :style="iconStyle"
        :height="iconHeight"
        :width="iconWidth"
      >
    </div>
  </template>
  
  
  <script setup>
  import { computed } from 'vue';

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    iconSrc: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: 'd-flex align-self-center me-5 mb-2'
    },
    iconStyle: {
      type: String,
      default: 'margin-top: -5px;'
    },
    iconAlt: {
      type: String,
      default: ''
    },
    iconHeight: {
      type: String,
      default: null
    },
    iconWidth: {
      type: String,
      default: null
    }
  });

</script>

<style scoped>
.weather-metric-row {
  font-size: 0.85rem;
}

.metric-label {
  flex: 1;
}

.metric-value {
  margin-right: 0.5rem;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .weather-metric-row {
    font-size: 1rem;
  }
}
</style>