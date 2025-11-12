/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uber: {
          black: '#000000',
          blue: '#276EF1',
          green: '#0F9D58',
          gray: {
            50: '#F6F6F6',
            100: '#EEEEEE',
            200: '#E2E2E2',
            300: '#CBCBCB',
            400: '#AFAFAF',
            500: '#757575',
            600: '#545454',
            700: '#333333',
            800: '#1F1F1F',
            900: '#0A0A0A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
