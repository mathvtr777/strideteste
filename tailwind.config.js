/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#8c30e8",
        "primary-dark": "#6d23b5",
        "background-light": "#f2f2f3",
        "background-dark": "#0a0a0b",
        "surface-dark": "#18181b",
        "card-dark": "#211c26",
        "accent-neon": "#a855f7",
        "gold": "#FFD700",
        "silver": "#C0C0C0",
        "bronze": "#CD7F32"
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"]
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #8c30e8" },
          "100%": { boxShadow: "0 0 20px #8c30e8, 0 0 10px #a855f7" }
        }
      }
    },
  },
  plugins: [],
}