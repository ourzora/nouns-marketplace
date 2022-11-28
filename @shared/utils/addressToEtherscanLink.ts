import { isAddress } from './isAddress'

// Returns an address when passed either an address or ENS domain
export function addressToEtherscanLink(address: string) {
  return `https://etherscan.io/address/${address}`
}
