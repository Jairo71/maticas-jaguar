/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto le dice a Tailwind dónde buscar clases
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}