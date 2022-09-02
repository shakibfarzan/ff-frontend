/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF423F',
        'primary-light': '#ff5f5d',
        'secondary': '#000F2D',
        'secondary-light': '#001e5b',
        'light': '#FFFFFA',
        'granite': '#5F5F60',
        'dark-liver': '#44414B',
      },
      fontFamily: {
        'kalam': "Kalam, cursive"
      }
    },
  },
  plugins: [],
}
