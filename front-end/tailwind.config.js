/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize:{
      "50%":"50%"
    },
    extend: {
      screens: {
        'xl-low': { 'raw': '(min-width: 1280px) and (min-height: 800px)' },
        'lg-tall': { 'raw': '(min-width: 1024px) and (min-height: 1350px)' },
        'sm-low': { 'raw': '(min-width: 340px) and (min-height: 840px)' }
      },
      colors:{
        "lightRose":"#F5D7DE",
        "gamboge":"#E49B0F", 
        "carmine":"#D70040",
        "green":"#39DB4A",
        "red" : "#FF6868",
        "secondary":"#555",
        "primaryBG":"#FCFCFC"
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
  ],
}

