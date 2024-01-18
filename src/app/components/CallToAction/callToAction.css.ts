import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../styles/theme.css"

const base = style({
  fontFamily: theme.fonts.monospace,
  fontWeight: theme.fontWeight.regular,
  borderRadius: theme.borderRadius,
  transition: theme.transition,
  cursor: "pointer",
  backgroundColor: "transparent",
})

export const button = styleVariants({
  primary_small: [
    base,
    {
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
      ":hover": {
        outline: "none",
        backgroundColor: "rgba(0,227,169,0.1)",
      },
      fontSize: theme.fontSize.small,
      padding: "0.8rem 1.5rem",
      lineHeight: theme.fontSize.small,
    },
  ],
  primary_big: [
    base,
    {
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
      ":hover": {
        outline: "none",
        backgroundColor: "rgba(0,227,169,0.1)",
      },
      fontSize: theme.fontSize.medium,
      padding: "1rem 2rem",
      lineHeight: theme.fontSize.medium,
    },
  ],
  red_big: [
    base,
    {
      color: theme.colors.red,
      border: `1px solid ${theme.colors.red}`,
      ":hover": {
        outline: "none",
        backgroundColor: "rgba(255,112,59,0.1)",
      },
      fontSize: theme.fontSize.medium,
      padding: "1rem 2rem",
      lineHeight: theme.fontSize.medium,
      "@media": {
        "screen and (max-width: 576px)": {
          fontSize: theme.fontSize.small,
          padding: "1rem",
          textAlign: "center",
          lineHeight: "1.5rem",
        },
      },
    },
  ],
  blue_big: [
    base,
    {
      color: theme.colors.blue,
      border: `1px solid ${theme.colors.blue}`,
      ":hover": {
        outline: "none",
        backgroundColor: "rgba(81,161,255,0.1)",
      },
      fontSize: theme.fontSize.medium,
      padding: "1rem 2rem",
      lineHeight: theme.fontSize.medium,
      "@media": {
        "screen and (max-width: 576px)": {
          fontSize: theme.fontSize.small,
          padding: "1rem",
          textAlign: "center",
          lineHeight: "1.5rem",
        },
      },
    },
  ],
})
