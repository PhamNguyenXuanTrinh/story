/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        main: '1250px',
        '1/2': '50%',
        '1/3': '33.3333%',
        '2/3': '66.6666%',
        '1/4': '25%',
        '3/4': '75%',
      },
      backgroundColor: theme => ({
        main: theme('colors.main'),
      }),
      colors: {
        main: 'rgb(183 138 40)',
      },
    },
  },
  plugins: [],
}
