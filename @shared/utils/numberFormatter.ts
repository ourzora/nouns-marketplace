export function numberFormatter(number: number | string) {
  const parsed =
    typeof number === 'string'
      ? number.includes('.')
        ? parseFloat(number)
        : parseInt(number, 10)
      : number
  if (isNaN(parsed)) {
    return '...'
  }

  return new Intl.NumberFormat('en-US').format(parsed)
}

export function numberFormatterUSDC(number: number | string) {
  const parsed =
    typeof number === 'string'
      ? number.includes('.')
        ? parseFloat(number)
        : parseInt(number, 10)
      : number
  if (isNaN(parsed)) {
    return '...'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parsed)
}
