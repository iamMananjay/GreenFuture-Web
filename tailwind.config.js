module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Primary color for buttons, links
        secondary: "#1e293b", // Secondary color for headers, text
        accent: "#fbbf24", // Accent for highlights
        light: "#f8fafc", // Light background
        dark: "#0f172a", // Dark mode background
        success: "#22c55e", // Success messages
        error: "#ef4444", // Error messages
        warning: "#f59e0b", // Warning notifications
      },
      spacing: {
        "88": "22rem", // Custom spacing for cards or sections
        "100": "25rem", // Larger spacing for modals
      },
      borderRadius: {
        "4xl": "2rem", // Larger rounded corners for cards
      },
      boxShadow: {
        smooth: "0 10px 20px rgba(0, 0, 0, 0.1)", // Smooth shadow for buttons and cards
        deep: "0 20px 25px rgba(0, 0, 0, 0.15)", // Deeper shadow for modals
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern sans-serif font
        heading: ["Poppins", "sans-serif"], // Bold, readable font for headers
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"), // For image ratios
    // require("@tailwindcss/line-clamp"), // For clamping text
  ],
};

