module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        fantasticons: '#4715BD',
      },
      colors: {
        fantasticons: '#AA8AE6',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(48px, 1fr))',
      },
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
};
