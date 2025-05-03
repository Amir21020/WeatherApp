<template>
  <div class="bottom-text" style="margin: 5%;">
    <div class="d-flex align-items-start ms-5">
      <p class="me-3" style="font-size: 8rem; line-height: 1;">{{ temperature }}</p>
      <div class="d-flex flex-column align-items-start" style="line-height: 1.45;">
        <p class="mb-0" style="font-size: 4rem;">{{ location }}</p>
        <p class="mb-0" style="font-size: 1.15rem;">{{ formattedTime }}</p>
      </div>
      <img :src="weatherIcon" :alt="weatherCondition" class="ms-3 align-self-start" style="width: 80px; margin-top: 2.3%;">
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';


const props = defineProps({
  temperature: {
    type: String,
    default: "16°"
  },
  location: {
    type: String,
    default: "London"
  },
  time: {
    type: String,
    default: "2023-09-09 06:09"
  },
  weatherIcon: {
    type: String,
    default: "/cloudy.svg"
  },
  weatherCondition: {
    type: String,
    default: "Cloudy"
  }
});

const currentTime = ref(new Date(props.time));

let intervalId;
onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 60000); 
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

function updateTime() {
  currentTime.value = new Date();
}


const formattedTime = computed(() => {
  const date = new Date(props.time);
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  const weekday = date.toLocaleString('en-US', { weekday: 'long' });
  
  return `${hours}:${minutes} - ${weekday}, ${day} ${month} '${year}`;
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