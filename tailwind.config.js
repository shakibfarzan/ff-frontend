/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF423F',
        'secondary': '#000F2D',
        'light': '#FFFFFA',
        'granite': '#5F5F60',
        'dark-liver': '#44414B',
      }
    },
  },
  plugins: [],
}
