import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cupCake", 
      "retro",
      "sunset",
      "nord",
      "dim",
      "winter",
      "coffee",
      "night",
      "lemonade",
      "acid",
      "bussiness",
      "autumn",
      "cmyk",
      "dracula",
      "luxury",
      "black",
      "wireframe",
      "fantasy",
      "pastel",
      "lofi",
      "aqua",
      "forest",
      "garden",
      "halloween",
      "valentine",
      "cyberpunk",
      "synthwave",
      "corporate",
      "bumblebee",

    ]
  },
}