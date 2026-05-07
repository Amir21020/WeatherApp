<template>
  <div class="d-flex flex-row align-items-start">
    <img
      class="d-flex align-items-start ms-2"
      :src="iconSrc"
      :alt="condition"
      style="width: 40px; height: 40px;"
    >
    <div class="d-flex flex-fill flex-column ms-2 me-2">
      <p class="mb-0">{{ time }}</p>
      <p class="mb-0">{{ condition }}</p>
    </div>
    <p class="d-flex align-items-center temperature mt-2">{{ temperature }}</p>
  </div>
</template>


<script setup>
defineProps({
  time: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  temperature: {
    type: String,
    required: true
  },
  iconSrc: {
    type: String,
    required: true
  }
});
</script>


<style scoped>
.temperature {
  font-size: 24px;
}
</style>
