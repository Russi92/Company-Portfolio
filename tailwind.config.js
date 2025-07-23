

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, #003A3A 0%, #007171 50%, #00B2B1 100%)',
      },
    },
  },
  plugins: [],
}


