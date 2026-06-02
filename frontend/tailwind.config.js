/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f9f5f0',
        deep: '#2c2118',
        warm: '#5c4033',
        gold: '#b89a6f',
        muted: '#6f5e4f',
        border: '#e8dcc6',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        'premium': '0.075em',
        'luxury': '0.15em',
      }
    },
  },
  plugins: [],
}