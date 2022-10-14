/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#000b1c",
        secondary: "#229e63",
        tertiary: "#0D203D"
      },
      fontFamily: {
        raleway: ['Raleway']
      }
    },
  },
  plugins: [],
}