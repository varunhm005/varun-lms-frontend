/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        width: {
          a4: '210mm',
        },
        height: {
          a4: '297mm',
        },
      },
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#ffe1e3',
          200: '#ffc9cc',
          300: '#fea3a9',
          400: '#fb6e77',
          500: 'rgba(239, 75, 37, 1)',
          600: '#e0222e',
          700: '#bc1923',
          800: '#a61a23',
          900: '#811b22',
          950: '#46090d',
        },
      },
    },
  },
  plugins: [],
};
