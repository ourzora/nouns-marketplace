import { isAddress } from './isAddress'

export function shortenAddress(address?: string, chars = 4): string {
  if (!address) {
    return ''
  }

  const parsed = isAddress(address)
  if (!parsed) {
    console.error(`Invalid 'address' parameter '${address}'.`)
    return ''
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
