import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // iPhone 11 width: 414px
        'iphone11': '414px',
        // Galaxy Tab S9 width: 1192px
        'tabs9': '1192px',
      },
      colors: {
        primary: {
          DEFAULT: "hsl(0 80% 60%)",
          foreground: "hsl(0 0% 100%)", 
        },
        background: "hsl(0 0% 98%)",
        foreground: "hsl(220 14.3% 4.1%)",
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(220 14.3% 4.1%)",
        },
        border: "hsl(0 0% 90%)",
        input: "hsl(0 0% 90%)",
        muted: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 45%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 95%)",
          foreground: "hsl(0 0% 30%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 30%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
