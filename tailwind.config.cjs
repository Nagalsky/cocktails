/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '540px',
      md: '768px',
      lg: '910px',
      xl: '1199px',
      '2xl': '1400px',
    },
    extend: {},
  },
  plugins: [],
}
