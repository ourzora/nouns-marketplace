import { getAddress } from '@ethersproject/address'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenTxHash(txHash: string, startChars = 7, endChars = 4): string {
  const [, base] = txHash.split('0x')
  return `0x${base.substring(0, startChars)}...${base.substring(base.length - endChars)}`
}

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

export function shortenCryptoAmount(ethAmount: string): string {
  return `${ethAmount.substring(0, 5)}...${ethAmount.substring(ethAmount.length - 4)}`
}

export function shortenToken(token?: string, chars = 4): string {
  return !token
    ? ''
    : token.length < 24
    ? token
    : `${token.substring(0, chars + 2)}...${token.substring(token.length - chars)}`
}

export function prepareJson<T>(json: T) {
  return JSON.parse(JSON.stringify(json))
}
