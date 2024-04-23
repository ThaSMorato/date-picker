/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#858585',
          dark: {
            DEFAULT: '#121212',
            muted: '#2F2F2F',
          },
          base: '#A0A0A0',
          light: '#F9F7F7',
        },
        red: {
          primary: '#F36A6A',
          secondary: '#FF7070',
        },
        green: '#62D0A2',
        blue: {
          primary: '#5865F2',
          // secondary: '',
          faded: {
            primary: '#F1F2FF',
            secondary: '#ECEEFF',
          },
          dark: '#131FA3',
        },
      },
    },
  },
  plugins: [],
}
