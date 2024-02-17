import { style } from "@vanilla-extract/css"
import { theme } from "../../styles/theme.css"

export const container = style({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "auto",
  minHeight: "80px",
  padding: "15px",
  textAlign: "center",
  fontSize: theme.fontSize.extraSmall,
  color: theme.colors.grey,
})

export const socialsContainer = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.space.extraLarge,
})

export const link = style({
  paddingLeft: theme.space.large,
  paddingRight: theme.space.large,
  transition: theme.transition,
  ":hover": {
    transform: "scale(1.1)",
  },
})

export const icon = style({
  width: "1.5rem",
  height: "1.5rem",
  color: theme.colors.text.dimmed,
  transition: theme.transition,
  ":hover": {
    color: theme.colors.primary,
  },
})

export const author = style({
  paddingLeft: theme.space.small,
  paddingRight: theme.space.small,
  transition: theme.transition,
  fontWeight: theme.fontWeight.bold,
  color: theme.colors.text.dimmed,
  ":hover": {
    transform: "scale(1.1)",
    color: theme.colors.primary,
  },
})
