import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        emc: {
          navy: "#0A1628",
          dark: "#0D1F3C",
          mid: "#112240",
          teal: "#00D4AA",
          teal2: "#00B894",
          cyan: "#00E5FF",
          amber: "#FFB703",
          slate: "#8892B0",
          light: "#CCD6F6",
          white: "#E6F1FF",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in": "slideIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulse2: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(0,212,170,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(0,212,170,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
