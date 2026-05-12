/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brew: {
          bg:        "#F7F3EE",
          card:      "#FDFAF6",
          cream:     "#E8DFD0",
          "cream-light": "#F2ECE4",
          espresso:  "#2E1B0E",
          dark:      "#1C1410",
          accent:    "#8B5E3C",
          "accent-lt": "#C4956A",
          muted:     "#7A6A5A",
          "muted-lt": "#B8A898",
          border:    "#E0D5C8",
          gold:      "#C9963A",
          success:   "#5A8A5A",
        },
      },
      fontFamily: {
        serif:  ["Cormorant Garamond", "Georgia", "serif"],
        sans:   ["DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        card:   "0 4px 24px rgba(46,27,14,0.07)",
        "card-hover": "0 12px 40px rgba(46,27,14,0.13)",
        panel:  "0 0 60px rgba(28,20,16,0.25)",
      },
      keyframes: {
        "slide-in": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to:   { transform: "translateX(0)",    opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.12)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":  "fade-in 0.35s ease both",
        "pop":      "pop 0.25s ease both",
      },
    },
  },
  plugins: [],
};
