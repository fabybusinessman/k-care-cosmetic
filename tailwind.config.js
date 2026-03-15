/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D990A0', // Un rosa suave y elegante
        secondary: '#6B8E23', // Un verde olivo para el toque natural
        light: '#FDF7F8', // Un fondo casi blanco con un toque rosado
      }
    },
  },
  plugins: [],
}
