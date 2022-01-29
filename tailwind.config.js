module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        '2': '2 2 0%',
        '6': '6 6 0%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
