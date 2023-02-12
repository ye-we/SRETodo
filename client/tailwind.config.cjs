/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#21212D",
        darker: "#171721",
        pink: "#FA89BD",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
