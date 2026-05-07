# WeatherApp

Прогноз погоды с динамическими фонами, автоподсказками городов и адаптивным дизайном.

## Возможности

- Текущая погода: температура, влажность, облачность, ветер, давление
- Почасовой прогноз на остаток дня
- Динамический фон, меняющийся в зависимости от времени суток и погоды
- Автоподсказки городов через Yandex Suggest API
- Поиск по названию города или координатам
- Автообновление каждые 30 минут
- Адаптивный интерфейс (мобильные, планшеты, десктоп)

## Технологии

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 6**
- **Bootstrap 5** (CSS + JS)
- **Axios**
- **vue-toastification** (уведомления)

## API ключи

Проект использует два API:

1. **WeatherAPI** — данные о погоде (ключ: `VITE_WEATHERAPI_KEY`)
2. **Yandex Maps Suggest** — подсказки городов (ключ: `VITE_YANDEX_SUGGEST_API_KEY`)

Создайте файл `.env` в корне проекта:

```
VITE_WEATHERAPI_KEY=your_key_here
VITE_YANDEX_SUGGEST_API_KEY=your_key_here
```

Получить ключи:
- [WeatherAPI](https://www.weatherapi.com/)
- [Yandex Suggest API](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/suggest.html)

## Установка и запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Деплой на GitHub Pages

```bash
npm run deploy
```

## Структура проекта

```
src/
├── composables/
│   ├── useClock.js      # Умные часы с автообновлением
│   └── useWeather.js    # Логика погоды (запросы, вычисления, фоны)
├── components/
│   ├── Header.vue
│   ├── SearchBar.vue
│   ├── SearchSuggestions.vue
│   ├── WeatherDetails.vue
│   ├── WeatherFooter.vue
│   ├── WeatherForecast.vue
│   ├── WeatherForecastList.vue
│   └── WeatherMetric.vue
├── App.vue
└── main.js
```
