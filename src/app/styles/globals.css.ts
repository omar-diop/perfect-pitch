import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "./theme.css"

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  fontFamily: theme.fonts.sans,
  background: theme.colors.background,
  color: theme.colors.text.dimmed,
  overflowX: "hidden",
})

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
})

globalStyle("strong", {
  color: theme.colors.primary,
  fontWeight: theme.fontWeight.bold,
})

globalStyle("*", {
  boxSizing: "border-box",
})

export const container = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
})
