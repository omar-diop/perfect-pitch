import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../styles/theme.css"

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
})

export const idle = style({
  color: theme.colors.text.dimmed,
  fontSize: "3.2rem",
  fontWeight: theme.fontWeight.bold,
  marginBottom: theme.space.large,
})

export const frequency = style({
  fontSize: theme.fontSize.medium,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.text.dimmed,
  fontFamily: theme.fonts.monospace,
})

export const name = style({
  color: theme.colors.text.normal,
  fontSize: "3.2rem",
  marginBottom: theme.space.large,
  fontWeight: theme.fontWeight.bold,
})
