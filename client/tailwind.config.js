/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./public/index.html"],
  theme: {
    extend: {
      width: {
        main: '1250px'
      },
      backgroundColor: {
        main: 'rgb(183 138 40)'
      },
      colors: {
        main: 'rgb(183 138 40)'
      },
    },
  },
  plugins: [],
}