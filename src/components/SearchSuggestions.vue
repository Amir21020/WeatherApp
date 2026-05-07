<template>
  <ul
    v-if="suggestions.length > 0"
    class="suggestions-dropdown"
  >
    <li
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @mousedown="$emit('select', suggestion)"
    >
      {{ suggestion.title.text }}
      <span v-if="suggestion.subtitle?.text">({{ suggestion.subtitle.text }})</span>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  suggestions: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select'])
</script>

<style scoped>
.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 45px;
  background: rgba(30, 30, 40, 0.98);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0 0 4px 4px;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.suggestions-dropdown li {
  padding: 10px 15px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  transition: background 0.15s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.suggestions-dropdown li:last-child {
  border-bottom: none;
}

.suggestions-dropdown li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.suggestions-dropdown li:active {
  background: rgba(255, 255, 255, 0.15);
}

.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: transparent;
}
</style>
