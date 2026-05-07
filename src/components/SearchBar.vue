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

    <SearchSuggestions
      v-if="showSuggestions && filteredSuggestions.length > 0"
      :suggestions="filteredSuggestions"
      @select="selectSuggestion"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, onBeforeUnmount } from 'vue';
import axios from 'axios';
import SearchSuggestions from './SearchSuggestions.vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'search']);

const inputValue = ref(props.modelValue);
const suggestions = ref([]);
const showSuggestions = ref(false);
let debounceTimer = null;

onBeforeUnmount(() => {
  clearTimeout(debounceTimer);
});

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
          apikey: import.meta.env.VITE_YANDEX_SUGGEST_API_KEY,
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
  suggestions.value =[];
  showSuggestions.value = false; 
  emit('search');
};

const emitSearch = () => {
  emit('search');
  showSuggestions.value = false;
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 100); 
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

</style>