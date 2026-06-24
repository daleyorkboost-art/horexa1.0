import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1180px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 8vw, 4rem)", { lineHeight: "1.05", letterSpacing: "0" }],
        h2: ["clamp(2rem, 5vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "0" }],
        h3: ["clamp(1.5rem, 3vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "0" }],
      },
      boxShadow: {
        glow: "0 0 28px hsl(var(--primary) / 0.35)",
        "glow-lg": "0 0 55px hsl(var(--primary) / 0.28)",
        industrial: "0 24px 70px rgb(0 0 0 / 0.35)",
      },
      backgroundImage: {
        "industrial-radial":
          "radial-gradient(circle at 70% 20%, hsl(var(--primary) / 0.12), transparent 34%), radial-gradient(circle at 10% 80%, hsl(var(--secondary) / 0.65), transparent 38%)",
        "orange-sheen":
          "linear-gradient(135deg, hsl(var(--primary)), #ff7a18 48%, hsl(var(--primary)))",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
