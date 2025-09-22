import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // tudo que começar com /api vai para o backend local
      '/api': 'http://localhost:3333'
    }
  }
})
