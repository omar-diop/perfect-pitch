import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../../styles/theme.css"

export const container = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "space-between",
  paddingBottom: theme.space.large,
  paddingTop: theme.space.large,
  position: "relative",
})

export const controls = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})
