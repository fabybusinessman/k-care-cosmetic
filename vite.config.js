import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/k-care-cosmetic/', // AQUÍ: Pon el nombre exacto de tu repo en GitHub
})