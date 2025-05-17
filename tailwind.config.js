/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "garden",
      "business",
      "wireframe",
      "black",
      "valentine",
      "retro",
      "fantasy",
      "pastel",
      "autumn",
      "winter",
    ],
    logs: false,
    darkTheme: "business",
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
