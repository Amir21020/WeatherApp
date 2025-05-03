<template>
  <div class="input-group pe-5 position-relative">
    <input
      type="text"
      class="form-control weather-input text-light"
      placeholder="Search Location..."
      aria-label="Search city"
      v-model="inputValue"
      @input="handleInput"
      @keyup.enter="emitSearch"
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
    />
    <button 
      class="btn bg-transparent border-light border-opacity-50 border-start-0"
      @click="emitSearch"
    >
      <img src="/fa_search.svg" alt="Search" class="search-icon" />
    </button>

    <ul 
      v-if="showSuggestions && filteredSuggestions.length > 0"
      class="suggestions-dropdown"
    >
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @mousedown="selectSuggestion(suggestion)"
      >
        {{ suggestion.title.text }}
        <span v-if="suggestion.subtitle?.text">({{ suggestion.subtitle.text }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import axios from 'axios';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'search']);

const inputValue = ref(props.modelValue);
const suggestions = ref([]);
const showSuggestions = ref(false);
let debounceTimer = null;

const filteredSuggestions = computed(() => {
  const searchText = inputValue.value.toLowerCase();
  return suggestions.value.filter(item => 
    item.title?.text?.toLowerCase().includes(searchText)
  );
});

const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const fetchSuggestions = async (query) => {
  if (query.length < 2) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await axios.get(
      'https://suggest-maps.yandex.ru/v1/suggest',
      {
        params: {
          apikey: '8bcb8912-9d0b-4210-af80-1c07b89fc1fb',
          text: query,
          types: 'locality',
          lang: 'en',
          limit: 5,
          strict: true 
        }
      }
    );
    suggestions.value = response.data.results || [];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    suggestions.value = [];
  }
};

const handleInput = debounce((e) => {
  const value = e.target.value;
  inputValue.value = value;
  emit('update:modelValue', value);
  fetchSuggestions(value);
}, 300);

const selectSuggestion = (suggestion) => {
  inputValue.value = suggestion.title.text;
  emit('update:modelValue', suggestion.title.text);
  suggestions.value = [];
  emit('search');
};

const emitSearch = () => {
  emit('search');
  showSuggestions.value = false;
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});
</script>


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

/* Suggestions dropdown styles */
.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 45px; /* Отступ справа */
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