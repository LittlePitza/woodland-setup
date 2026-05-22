import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Woodland palette — fall forest aesthetic
        paper: {
          light: "#F4E8D0",
          DEFAULT: "#EADCBC",
          dark: "#D9C79E",
        },
        ink: {
          DEFAULT: "#2B1810",
          soft: "#3F2A1E",
          muted: "#6B4D3A",
        },
        moss: "#4A6B3A",
        bark: "#6B4423",
        rust: "#B5482E",
        amber: "#C97B2B",
        sage: "#7A8B6F",
        ember: "#8B2F1A",
        // Faction colors
        faction: {
          marquise: "#C0392B",
          eyrie: "#2980B9",
          alliance: "#27AE60",
          vagabond: "#7F8C8D",
          cult: "#E67E22",
          riverfolk: "#16A085",
          duchy: "#8E44AD",
          corvid: "#2C3E50",
          hundreds: "#D35400",
          keepers: "#34495E",
          diaspora: "#1ABC9C",
          council: "#6C5CE7",
          knaves: "#B8860B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 20% 20%, rgba(139, 90, 43, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(101, 67, 33, 0.05) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(139, 90, 43, 0.04) 0%, transparent 60%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.17 0 0 0 0 0.09 0 0 0 0 0.06 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        card: "0 2px 8px rgba(43, 24, 16, 0.12), 0 12px 24px -8px rgba(43, 24, 16, 0.18)",
        "card-hover":
          "0 4px 12px rgba(43, 24, 16, 0.18), 0 20px 40px -8px rgba(43, 24, 16, 0.28)",
        inset: "inset 0 2px 4px rgba(43, 24, 16, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "flip-in": "flipIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flipIn: {
          "0%": { opacity: "0", transform: "rotateY(-90deg)" },
          "100%": { opacity: "1", transform: "rotateY(0deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
