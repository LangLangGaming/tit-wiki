/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./admin/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#e63946',
        link: '#4dabf7',
      },
      spacing: {
        'navbar-height': '72px',
        'footer-height': '72px',
      },
      maxWidth: {
        'content': '1200px',
      },
      fontFamily: {
        'source-sans': "'Source Sans 3', sans-serif",
        'open-sans': "'Open Sans', sans-serif",
        'noto-sans': "'Noto Sans', sans-serif",
        'intel-mono': "'Intel One Mono', monospace",
        'nunito-sans': "'Nunito Sans', sans-serif",
        'black-ops': "'Black Ops One', sans-serif",
        'space-grotesk': "'Space Grotesk', sans-serif",
      },
      keyframes: {
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}