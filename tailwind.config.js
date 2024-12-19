module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Custom primary color
        secondary: "#1e293b", // Custom secondary color
        accent: "#fbbf24", // Accent color
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
