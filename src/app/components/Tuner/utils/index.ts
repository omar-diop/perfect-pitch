export const centsOffToPercentage = (cents: number | undefined) =>
  cents ? 0.5 + cents / 100 : 0.5

export const getColorsArray = () => {
  const baseColors = new Array(31).fill("#CBFBE6")
  baseColors[13] = "#00E3A9"
  baseColors[14] = "#00E3A9"
  baseColors[15] = "#00E3A9"
  baseColors[16] = "#00E3A9"
  baseColors[17] = "#00E3A9"
  return baseColors
}
