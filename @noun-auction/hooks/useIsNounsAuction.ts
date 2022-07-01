export function useIsNounsAuction(contractAddress: string) {
  const auctionContractWhiteList = [
    '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03'.toLowerCase(),
  ]

  return {
    isNounsAuction: auctionContractWhiteList.includes(contractAddress.toLowerCase()),
  }
}
