import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

export function useClock(timeRef) {
  const currentTime = ref(
    timeRef.value && !isNaN(new Date(timeRef.value))
      ? new Date(timeRef.value)
      : new Date()
  )

  watch(timeRef, (newTime) => {
    if (newTime && !isNaN(new Date(newTime))) {
      currentTime.value = new Date(newTime)
    } else {
      currentTime.value = new Date()
    }
  }, { immediate: true })

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      currentTime.value = new Date(currentTime.value.getTime() + 60000)
    }, 60000)
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  const formattedTime = computed(() => {
    const date = currentTime.value
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = String(date.getFullYear()).slice(-2)
    const weekday = date.toLocaleString('en-US', { weekday: 'long' })
    return `${hours}:${minutes} - ${weekday}, ${day} ${month} '${year}`
  })

  return { formattedTime }
}
