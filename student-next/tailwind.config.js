const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './shared/**/*.{js,ts,jsx,tsx}', './domains/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      'fontFamily': {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      'colors': {
        'primary': '#2D79AD',
        // 'primary': '#136DC1',
        'secondary': '#14A60E',
        'tretiary': '#CDE9F8',
        'disable': '#BDBDBD',
        'main': '#191919',
        'background': '#DBDBDB',
        'accent-color': '#EF5252'
      },
      'height':{
        'exclude-header': "calc(100vh - 80px)",
      },
      'minHeight':{
        'exclude-header': "calc(100vh - 80px)",
      },
      backgroundImage: {
        'fa-primary-pattern': "linear-gradient(45deg, #2D79AD 0%, rgb(21, 170, 191) 100%)",
        'fa-primary-dark-pattern': "linear-gradient(45deg, rgb(21, 170, 191) 0%, #12659b 80%)",
       }
    },
    'boxShadow': {
      'sh-6-16-12': 'rgba(0, 0, 0, 0.12) 0px 6px 16px',
      'sh-1-12-08': 'rgba(0, 0, 0, 0.08) 0px 1px 12px'
    }
  },
  variants: ['responsive', 'hover', 'focus', 'group-hover', 'disabled'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('postcss-nested'),
    require('tailwindcss-pseudo-elements')({
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      contentUtilities: false,
      emptyContent: false,
      classNameReplacer: {
        'hover:before:text-black': 'hbt',
      },
    }),
  ],
}
