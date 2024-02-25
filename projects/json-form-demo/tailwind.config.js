/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/**/*.{html,ts,css,scss,sass,less,styl}'
  ],
  darkMode: 'class', // false, 'media' or 'class
  theme: {
    extend: {
      colors: {
        // menu
        menu        : 'var(--menu)',
        menu_light  : 'var(--menu-light)',
        menu_dark   : 'var(--menu-dark)',

        // background
        primary     : 'var(--primary)',
        secondary   : 'var(--secondary)',
        tertiary    : 'var(--tertiary)',
        accent      : 'var(--accent)',

        // text
        dark        : 'var(--dark)',
        darker      : 'var(--darker)',
        light       : 'var(--light)',
        lighter     : 'var(--lighter)',
        disabled    : 'var(--disabled)',
        placeholder : 'var(--placeholder)',
        static_gray : 'var(--static-gray)',
        icon        : 'var(--icon)',

        // border
        borderline  : 'var(--borderline)',

        // input
        label       : 'var(--label)',
        input       : 'var(--input)',
      },
    },
  },
  plugins: [],
}

