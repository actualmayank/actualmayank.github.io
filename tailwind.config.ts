import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ui: ["Inter", "Arial", "sans-serif"],
        pixel: ["'Pixelify Sans'", "'Courier New'", "monospace"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
      },
      colors: {
        moonNavy: "#071225",
        moonDeep: "#030814",
        winBlue: "#000080",
        winGray: "#c0c0c0",
      },
      boxShadow: {
        win: "2px 2px 0 rgba(0,0,0,.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
