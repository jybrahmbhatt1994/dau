import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (from design-system.md + Figma export)
        navy: "#121531", // top utility bar / deep accents
        ink: "#161A3F", // placements dark section background
        brand: {
          DEFAULT: "#CB4B36", // hero panel / contact red
          alt: "#DD4E33", // arrow icons / subscribe button
        },
        gold: "#EDBE4B", // underlines / highlights
        royal: "#2C3580", // outline + primary buttons
        surface: "#F7F7F8", // page background
        line: "#E5E5E5", // hairline borders
        ash: "#525252", // muted text
        field: "#B3BCD1", // input borders
      },
      fontFamily: {
        sans: ["var(--font-mulish)", "system-ui", "sans-serif"],
        display: ["Namdhinggo", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      boxShadow: {
        header: "0 2px 10px rgba(0,0,0,0.08)",
        card: "0 2px 10px rgba(0,0,0,0.08)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
