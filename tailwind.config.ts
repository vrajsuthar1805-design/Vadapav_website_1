import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          dark: "#0d0404",
          card: "#180a0a",
          cardHover: "#230f0f",
          border: "#421818",
          red: {
            DEFAULT: "#b91c1c",
            dark: "#7f1d1d",
            deep: "#450a0a",
            light: "#ef4444",
          },
          saffron: {
            DEFAULT: "#ea580c",
            light: "#f97316",
            warm: "#fb923c",
          },
          gold: {
            DEFAULT: "#f59e0b",
            light: "#fbbf24",
            bright: "#fcd34d",
            dark: "#b45309",
          },
          cream: "#fef3c7",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        glowRed: "0 0 25px -5px rgba(220, 38, 38, 0.35)",
        festiveCard: "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(245, 158, 11, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "steam": "steam 2.5s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "50%": { transform: "translateY(-12px) scaleX(1.1)", opacity: "0.6" },
          "100%": { transform: "translateY(-24px) scaleX(1.2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
