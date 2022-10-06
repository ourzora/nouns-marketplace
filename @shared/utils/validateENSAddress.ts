export const validateENSAddress = (address: string): boolean => {
  return /\.eth$/.test(address)
}
