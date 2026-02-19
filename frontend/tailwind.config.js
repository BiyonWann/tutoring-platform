/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005757',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#93bcd7',
          foreground: '#171a2b',
        },
        accent: {
          DEFAULT: '#475c71',
          foreground: '#ffffff',
        },
        background: '#f2f5ff',
        card: '#ffffff',
        foreground: '#171a2b',
        muted: {
          DEFAULT: '#D4D7E3',
          foreground: '#475c71',
        },
        border: 'rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4AC74E 0%, #3da83f 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      },
    },
  },
  plugins: [],
}

