/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
        iceBlue: '#E6F0F6',
        powderBlue: '#BFD7ED',
        skyMist: '#A8CDE7',
        dustyBlue: '#7BAFD4',
        slateBlue: '#4C6E91',
      },
    },
  },
  plugins: [],
}