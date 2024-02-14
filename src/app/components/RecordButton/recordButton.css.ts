import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../styles/theme.css"

const buttonBase = style({
  fontFamily: theme.fonts.monospace,
  fontWeight: theme.fontWeight.regular,
  transition: theme.transition,
  boxShadow: theme.boxShadow.buttons,
  borderRadius: "50%",
  width: "6.5rem",
  height: "6.5rem",
})

const innerBase = style({
  cursor: "pointer",
  width: "100%",
  height: "100%",
  fontSize: theme.fontSize.small,
  transform: "scale(0.90)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  transition: theme.transition,
})

export const button = styleVariants({
  pressed: [
    buttonBase,
    {
      background: "linear-gradient( 135deg, #0cd685 0%, #13a673 100% )",
    },
  ],
  idle: [
    buttonBase,
    {
      background:
        "linear-gradient( 135deg, rgba(32, 37, 41, 1) 0%, rgba(22, 24, 25, 1) 100% )",
    },
  ],
})

export const inner = styleVariants({
  pressed: [
    innerBase,
    {
      background: "linear-gradient( 135deg, #09b387 0%, #00E3A9 100% )",
      boxShadow: "inset 0.75vw 0.75vw 0.75vw rgba(0, 0, 0, 0.2)",
      color: theme.colors.text.normal,
    },
  ],
  idle: [
    innerBase,
    {
      boxShadow: "inset 0 0 0.3vw rgba(255, 255, 255, 0.1);",
      background:
        "linear-gradient( 135deg, rgba(40, 43, 48, 1) 0%, rgba(29, 32, 35, 1) 100% );",
      color: theme.colors.text.dimmed,
    },
  ],
})

export const icon = style({
  width: "2rem",
  height: "2rem",
})
