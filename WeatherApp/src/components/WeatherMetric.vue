<template>
    <div class="d-flex flex-row align-items-center">
      <p class="d-flex flex-fill align-items-center" :class="{ 'me-2 mb-0': isPressure }">{{ label }}</p>
      <p class="align-items-center me-2  mb-3" >{{ value }}</p>
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
  defineProps({
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