export const roundFourDecimals = (value?: number) =>
  value ? Math.round(value * 10000) / 10000 : 0
