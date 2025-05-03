import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/WeatherApp/',
  server: {
    fs: {
      strict: true,
      deny: ['.env', '*.pem'], 
      allow: ['src'] 
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
