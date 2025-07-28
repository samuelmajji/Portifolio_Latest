// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ['"Indie Flower"', "cursive"],
        modern: ['"Poppins"', "sans-serif"],
        heading: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
