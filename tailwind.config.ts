import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These mirror CSS custom properties defined in globals.css
        // so they can be swapped at runtime via theme changes
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        "surface-overlay": "var(--color-surface-overlay)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        note: ["var(--font-note)", "sans-serif"],
      },
      boxShadow: {
        note: "2px 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
        "note-hover": "4px 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)",
        panel: "0 8px 32px rgba(0,0,0,0.16)",
      },
      borderRadius: {
        note: "3px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        calm: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
