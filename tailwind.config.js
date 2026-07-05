/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2933",
        paper: "#FAF9F6",
        mist: "#EFF6F4",
        sage: "#AFC8AD",
        clay: "#E9B872",
        coral: "#DF8F7D",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(31, 41, 51, 0.12)",
        card: "0 16px 38px rgba(31, 41, 51, 0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
