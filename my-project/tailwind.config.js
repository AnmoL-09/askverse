/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        darkBg: "#121212",
        lightBg: "#f9f9f9",
        glass: "rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
      },
    },
  },
  plugins: [],
};
