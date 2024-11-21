// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c48d0a",
        secondary: "#666",
        accent: "#ffffff",
        hoverAccent: "#f0f0f0",
      },
    },
  },
  plugins: [],
}
