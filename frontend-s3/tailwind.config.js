/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        '170': '170px',
        '350': '350px',
      }, 
      width: {
        "600": "600px",
      },
      maxWidth: {
        '170': '170px',
      },
      colors: {
        b:{
          "100": "#333333",
        }
      }
    },
  },
  plugins: [],
}
