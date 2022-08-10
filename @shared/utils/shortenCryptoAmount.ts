export function shortenCryptoAmount(ethAmount: string): string {
  return `${ethAmount.substring(0, 5)}...${ethAmount.substring(ethAmount.length - 4)}`
}
