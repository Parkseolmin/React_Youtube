/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGreen: '#03bb77',
      },
      screens: {
        'max-1500': { max: '1500px' },
        'max-800': { max: '800px' },
      },
    },
  },
  plugins: [],
};
