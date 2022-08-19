export const roundTwoDecimals = (value?: number) =>
  value ? Math.round(value * 100) / 100 : 0
