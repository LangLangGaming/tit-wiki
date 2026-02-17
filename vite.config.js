<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
>>>>>>> f644e1db94e6dc260bd97c32ab2c0cdf0125c00d
