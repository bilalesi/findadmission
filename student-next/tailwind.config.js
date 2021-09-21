module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
      height:{
        'exclude-header': "calc(100vh - 80px)",
      },
      minHeight:{
        'exclude-header': "calc(100vh - 80px)",
      }
    },
    boxShadow: {
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
