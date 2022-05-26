export function etherscanAddress(address: string, network: string) {
  let subdomain = ''
  switch (network) {
    case 'rinkeby': {
      subdomain = 'rinkeby.'
      break
    }
  }

  return `https://${subdomain}etherscan.io/address/${address}#code`
}
