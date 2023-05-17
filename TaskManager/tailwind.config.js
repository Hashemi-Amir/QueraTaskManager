/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundPosition : {
        'bottom-1' : '0px 170px'
      }
    },
  },
  plugins: [],
}

