/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        display: ['Playball', 'cursive'],
        normal: ['EB Garamond', 'serif']
      },
    },
  },
  plugins: [],
}

