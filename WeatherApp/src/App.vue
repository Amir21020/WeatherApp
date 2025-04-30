<template>
  <div class="weather-bg text-light" :style="styleImg">
    <Header></Header>
    <div class="blur-right border border-secondary border-start border-1 border-opacity-10">
      <div class="ms-5 mt-3 mb-3">
        <div class="input-group pe-5">
          <input 
            v-model="locationName"
            @keypress="handleKeyPress"
            type="text"
            class="form-control weather-input text-light"
            placeholder="Search Location..."
            aria-label="Search city"
          />
          <button class="btn bg-transparent border-light border-opacity-50 border-start-0" @click="fetchForecast">
            <img src="/fa_search.svg" alt="Search" class="search-icon" />
          </button>
        </div>
        <WeatherDetails 
          :temperature="temperature" 
          :windSpeed="windSpeed"
          :windDirection="windDirection" 
          :humidity="humidity"
          :cloud="cloud"
          :pressure="pressure"
          :briefInformation="briefInformation"
          :dynamicStyle="dynamicStyle"
          :tempIcon="tempIcon">
        </WeatherDetails>
        <WeatherForecastList 
          :hours="hours">
        </WeatherForecastList>
      </div>
    </div>
    <WeatherFooter 
      :location="location" 
      :time="time" 
      :weatherIcon="weatherIcon" 
      :temperature="temperature">
    </WeatherFooter>
  </div>
</template>

<script setup>
    import Header from './components/Header.vue';
    import WeatherDetails from './components/WeatherDetails.vue';
    import WeatherFooter from './components/WeatherFooter.vue';
    import WeatherForecastList from './components/WeatherForecastList.vue';
    import { ref, onMounted, computed } from 'vue';

    const locationName = ref('Самара');

    const location = ref('');
    const time = ref('');
    const weatherIcon = ref('');
    const temperature = ref('');
    const windSpeed = ref('');
    const windDirection = ref('');
    const windDegree = ref('');
    const humidity = ref('');
    const cloud = ref('');
    const pressure = ref('');

    const briefInformation = ref('');
    const dynamicStyle = ref('');
    const tempIcon = ref('');

    const hours = ref([]);
    const styleImg = ref(''); 

    let period;
    let timeOfDay;

    const fetchForecast = async () => {
      try{
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b09eef2d7f6742f480565806252504&q=${locationName.value}&days=1&aqi=no&alerts=no`);
        const data = await response.json();  

        location.value = data.location.name;
        time.value = data.location.localtime;
        weatherIcon.value = data.current.condition.icon;
        temperature.value = data.current.temp_c + '°'; 

        windSpeed.value = (data.current.wind_kph/3.6).toFixed(1) + ' m/s';
        windDirection.value = data.current.wind_dir;
        windDegree.value = data.current.wind_degree

        humidity.value = data.current.humidity + ' %';
        cloud.value = data.current.cloud + ' %';
        pressure.value = data.current.pressure_mb + ' hPa';

        briefInformation.value = data.current.condition.text;     
        dynamicStyle.value = "margin-top: -5px; transform: rotate(" + (windDegree.value + 90).toString() + "deg);"
        tempIcon.value = data.current.temp_c > 0 ? "/temp_max.svg": "/temp_min.svg";

        hours.value = Array.from({ length: 24 }, (_, i) => ({
          time: data.forecast.forecastday[0].hour[i].time.slice(-5),
          condition: data.forecast.forecastday[0].hour[i].condition.text,
          temperature: data.forecast.forecastday[0].hour[i].temp_c.toString() + '°',
          iconSrc: data.forecast.forecastday[0].hour[i].condition.icon
        }));

        period = time.value.slice(-5, -4) == 0 ? time.value.slice(-4, -3) : time.value.slice(-5, -3);

        if (period <= 5 || period >= 22){
          timeOfDay = "night"
        }
        else if (period <= 17){
          timeOfDay = "day"
        }
        else {
          timeOfDay = "evening"
        }

        if (data.current.cloud <= 25){
          styleImg.value = "background-image: url('dynamicWeather/" + timeOfDay + "ClearSky.jpg');"
        }
        else if (data.current.cloud > 25 && data.current.cloud <= 50){
          styleImg.value = "background-image: url('dynamicWeather/" + timeOfDay + "CloudSky.jpg');"
        }
        else if (data.current.cloud > 50 && data.current.cloud <= 100){
          styleImg.value = "background-image: url('dynamicWeather/" + timeOfDay + "FullCloudSky.jpg');"
        }    
      }
      catch(error){  
        console.log(`Ошибка: ${error}`);
      }
    }

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        fetchForecast();
      }
    };

    onMounted(() => {
      fetchForecast();
    });

</script>

<style scoped>
  .weather-bg {
    background-image: url('clearSky.jpg');
    position: relative;
    background-size: cover;
    background-position: center;
    height: 100vh; 
    display: flex;
    flex-direction: column;
    padding: 1rem; 
    overflow: hidden; 
  }

  .blur-right {
    top: 0;
    right: 0;
    height: 100%;
    width: 30%;
    position: absolute;
    backdrop-filter: blur(5px);
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3));
    display: flex;
    flex-direction: column;
  }
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