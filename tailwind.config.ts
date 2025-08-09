import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: {
          "blue-light": "#2DC5FF",
          blue: "#00A1F8",
          "gray-dark": "#333333",
          "gray-darker": "#212121",
        },
        link: "#011aff",
      },
      maxWidth: {
        content: "var(--content-width)",
      },
      animation: {
        "scroll-left": "scroll-left 30s linear infinite",
        "scroll-right": "scroll-right 30s linear infinite",
        "scroll-slow": "scroll-left 40s linear infinite",
        "scroll-medium": "scroll-left 30s linear infinite",
        "scroll-fast": "scroll-left 20s linear infinite",
        "scroll-right-slow": "scroll-right 40s linear infinite",
        "scroll-right-medium": "scroll-right 30s linear infinite",
        "scroll-right-fast": "scroll-right 20s linear infinite",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
