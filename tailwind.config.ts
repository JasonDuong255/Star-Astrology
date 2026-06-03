import type { Config } from "tailwindcss";

/**
 * Design tokens được khai báo dưới dạng CSS custom properties trong globals.css
 * và đổi giá trị theo [data-theme]. Tailwind chỉ trỏ tới biến → 1 class chạy cả
 * 2 theme (đêm sao mặc định / giấy cổ).
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: {
          DEFAULT: "var(--color-surface)",
          "2": "var(--color-surface-2)",
        },
        line: "var(--color-line)",
        "line-strong": "var(--color-line-strong)",
        fg: {
          DEFAULT: "var(--color-fg)",
          muted: "var(--color-fg-muted)",
          faint: "var(--color-fg-faint)",
        },
        brass: {
          DEFAULT: "var(--color-brass)",
          soft: "var(--color-brass-soft)",
          deep: "var(--color-brass-deep)",
        },
        jade: "var(--color-jade)",
        cinnabar: "var(--color-cinnabar)",
        cta: {
          DEFAULT: "var(--color-cta)",
          soft: "var(--color-cta-soft)",
          ink: "var(--color-cta-ink)",
        },
        paper: {
          DEFAULT: "var(--color-paper)",
          ink: "var(--color-paper-ink)",
          line: "var(--color-paper-line)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        sink: "var(--shadow-sink)",
        float: "var(--shadow-float)",
        ring: "0 0 0 1px var(--color-line)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rotate-rev": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "rotate-slow": "rotate-slow 90s linear infinite",
        "rotate-rev": "rotate-rev 120s linear infinite",
        "spin-load": "rotate-slow 2.6s cubic-bezier(0.6,0.1,0.4,0.9) infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.6s ease both",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
