/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tp: {
          dark: '#11151A',
          darker: '#0C0F14',
          card: '#1B2028',
          cardHover: '#232932',
          cyan: '#00A3FF',
          blue: '#144670',
          text: '#FFFFFF',
          textMuted: '#8E9AA9',
          success: '#00D150'
        }
      }
    },
  },
  plugins: [],
}
