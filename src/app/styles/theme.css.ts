import { createGlobalTheme } from "@vanilla-extract/css"

export const theme = createGlobalTheme(":root", {
  space: {
    none: "0",
    extraSmall: "0.15rem",
    small: "0.25rem",
    medium: "0.5rem",
    large: "1rem",
    extraLarge: "2rem",
  },
  fonts: {
    sans: "Roboto, sans-serif",
    monospace: "Roboto Mono, monospace",
  },
  colors: {
    background: "#25272a",
    lightBackground: "#131313",
    primary: "#00E3A9",
    blue: "#56A1FF",
    red: "#FF703B",
    grey: "rgba(169,169,169,0.4)",
    darkGrey: "#262626",
    text: {
      normal: "#ffffff",
      dimmed: "#A9A9A9",
    },
  },
  fontSize: {
    extraSmall: "0.85rem",
    small: "1rem",
    medium: "1.25rem",
    large: "2.25rem",
  },
  fontWeight: {
    regular: "400",
    semiBold: "500",
    bold: "700",
  },
  lineHeight: {
    small: "1.5rem",
    medium: "1.75rem",
    large: "2.5rem",
  },
  borderRadius: {
    small: "20px",
    medium: "24px",
    large: "32px",
  },
  gradient: {
    background:
      "linear-gradient( 180deg, rgba(62, 67, 76, 1) 0%, rgba(30, 32, 36, 1) 100% )",
    inner:
      "linear-gradient( 180deg, rgba(49, 56, 61, 1) 0%, rgba(24, 25, 29, 1) 100% )",
  },
  transition: "all 0.25s cubic-bezier(0.645,0.045,0.355,1)",
  boxShadow: "2vw 2vw 8vw black",
})
