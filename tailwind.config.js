/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: {
            DEFAULT: '#781523',
            50: '#fdf2f3',
            100: '#fbe6e8',
            200: '#f7cfd3',
            300: '#f0aab2',
            400: '#e57884',
            500: '#d34b5a',
            600: '#bb3242',
            700: '#9b2432',
            800: '#781523',
            900: '#5c131d',
            950: '#34050b',
          },
          gold: {
            DEFAULT: '#c68a26',
            light: '#f5d58c',
            dark: '#9e6712',
          },
          cream: {
            DEFAULT: '#fbf9f4',
            warm: '#f6f1e7',
            border: '#e8dfd1',
          },
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'Outfit'", 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
