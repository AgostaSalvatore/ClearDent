/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#EEF2F7',
          100: '#D4DFE9',
          600: '#1B3A5C',
          700: '#142D47',
          800: '#0E2033',
          900: '#080F1A',
        },
        teal: {
          400: '#2DD4BF',
          500: '#00A9A5',
          600: '#008C89',
        },
      },
    },
  },
  plugins: [],
}
