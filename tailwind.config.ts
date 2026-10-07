import type { Config } from "tailwindcss";

/**
 * Design System — "Luxury Medical Education"
 * Preto profundo · Off-white · Grafite · Branco · Platina (metálico discreto)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "3rem" } },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B", // preto profundo
          900: "#0A0A0B",
          800: "#111113",
          700: "#18191B", // grafite profundo
          600: "#222326",
          500: "#2E3034",
        },
        bone: {
          DEFAULT: "#F3F0EA", // off-white
          50: "#FBFAF7",
          100: "#F3F0EA",
          200: "#E7E2D8",
          300: "#D6CFC2",
        },
        graphite: { DEFAULT: "#5C5F66", light: "#8A8D94" },
        platinum: { DEFAULT: "#B9B5AC", light: "#D9D5CC", dark: "#8E8A80" },
        signal: { open: "#9DBFA8", soon: "#C9B98F", closed: "#A3A3A3", live: "#C7A6A0" },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 9vw, 9.5rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6.4vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2.1rem, 4.6vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.05" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      maxWidth: { prose: "38rem", wide: "90rem" },
      transitionTimingFunction: { luxe: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.08) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.22) translate3d(-2%, -2%, 0)" },
        },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-2%,1%)" },
          "50%": { transform: "translate(1%,-2%)" },
          "75%": { transform: "translate(2%,2%)" },
        },
      },
      animation: {
        kenburns: "kenburns 14s cubic-bezier(0.22,1,0.36,1) forwards",
        marquee: "marquee 60s linear infinite",
        grain: "grain 1.2s steps(4) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
