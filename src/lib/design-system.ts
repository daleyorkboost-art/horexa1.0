export const brandColors = {
  primaryOrange: "#E8650A",
  background: "#0D0D0D",
  secondaryBackground: "#1A1A2E",
  cards: "#1E1E2E",
  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC",
  border: "#333333",
} as const;

export const typography = {
  fontFamily: "Inter",
  heroHeading: "64px",
  h2: "40px",
  h3: "28px",
  body: "16px",
} as const;

export const motionPreset = {
  duration: 0.45,
  ease: "easeOut",
  viewport: { once: true, margin: "-80px" },
} as const;
