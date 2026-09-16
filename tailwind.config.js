/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#07090e',
        navy: {
          950: '#0a0e1a',
          900: '#0e1424',
          800: '#151d33',
        },
        gold: {
          300: '#f6e05e',
          400: '#ecc94b',
          500: '#d4af37',
          600: '#b7791f',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
        arabic: ['"Tajawal"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
