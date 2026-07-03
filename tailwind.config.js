/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171615",
        muted: "#6d6458",
        brand: "#cc4c2f",
        brandDark: "#762d21",
        green: "#176b59",
        blue: "#205c8f",
        gold: "#d49a39",
        panel: "rgba(255, 252, 245, 0.9)",
        line: "rgba(23, 22, 21, 0.12)"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(64, 42, 22, 0.14)"
      },
      borderRadius: {
        brand: "8px"
      },
      maxWidth: {
        brand: "1180px"
      },
      fontFamily: {
        serif: ["Cambria", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
