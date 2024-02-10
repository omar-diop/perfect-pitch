import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "./theme.css"

export const main = style({
  margin: "0px auto",
  width: "100%",
  minHeight: "100vh",
  padding: "0px 150px",
  "@media": {
    "screen and (max-width: 992px)": {
      padding: "0px 100px",
    },
    "screen and (max-width: 768px)": {
      padding: "0px 40px",
    },
    "screen and (max-width:576px)": {
      padding: "0px 25px",
    },
  },
})

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export const container = style({
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export const logo = style({
  maxWidth: "100%",
  height: "auto",
})

export const box = style({
  padding: "2rem",
  height: "600px",
  width: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  borderRadius: theme.borderRadius.medium,
  boxShadow: theme.boxShadow,
  background: theme.gradient.background,
  "::before": {
    content: "",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: theme.borderRadius.small,
    transform: "scale(0.98, 0.98)",
    background: theme.gradient.inner,
  },
})
