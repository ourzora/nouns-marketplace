export interface NounishAuctionVolumeQueryProps {
  salesType: 'NOUNS_AUCTION_SALE' | 'LIL_NOUNS_AUCTION_SALE'
  /**
   * Nounish Token Contract
   */
  contractAddress: string
}

export function nounishAuctionVolume({
  salesType,
  contractAddress,
}: NounishAuctionVolumeQueryProps) {
  return `{
    aggregateStat {
      salesVolume(
        where: {
          collectionAddresses: ${contractAddress}
        },
        filter: {
          saleTypes: NOUNS_AUCTION_SALE
        }
      ) {
        chainTokenPrice
        totalCount
        usdcPrice
      }
    }
  }`
}
