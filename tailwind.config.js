/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        burmese: ['Padauk', 'Myanmar3', 'Pyidaungsu', 'sans-serif'],
      },
      fontSize: {
        'xs-burmese': '0.875rem',
        'sm-burmese': '1rem',
        'base-burmese': '1.125rem',
        'lg-burmese': '1.25rem',
        'xl-burmese': '1.5rem',
        '2xl-burmese': '1.875rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
