module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#14A60E',
        'normal': '#2D79AD',
        'error': '#C00101',
        'alert-success': '#D5F6D4',
        
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
