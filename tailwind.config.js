/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#105a33',
        lightBlack: 'rgba(0, 0, 0, 0.8)',
      },
      fontFamily: {
        pretendard: 'Pretendard Variable',
      },
      transitionProperty: {
        filter: 'filter',
        left: 'left',
      },
    },
  },
  plugins: [],
};
