/** @type {import('tailwindcss').Config} */
// Traemos los colores de tailwindcss
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*{html,js}'],
  plugins: [
    require('@tailwindcss/forms'),
  ],
  theme: {
    //Agregamos los colores
    colors: {
      ...colors,
    },
  },
};
