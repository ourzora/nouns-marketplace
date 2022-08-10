export function shortenTxHash(txHash: string, startChars = 7, endChars = 4): string {
  const [, base] = txHash.split('0x')
  return `0x${base.substring(0, startChars)}...${base.substring(base.length - endChars)}`
}
