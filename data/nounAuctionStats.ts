export interface NounishAuctionVolumeQueryProps {
  salesType?: 'NOUNS_AUCTION_SALE' | 'LIL_NOUNS_AUCTION_SALE'
  contractAddress: string
}

export function nounishAuctionVolume(
  salesType?: 'NOUNS_AUCTION_SALE' | 'LIL_NOUNS_AUCTION_SALE',
  contractAddress?: string
) {
  if (!salesType) return
  return `{
    aggregateStat {
      salesVolume(
        where: {
          collectionAddresses: "${contractAddress}"
        },
        filter: {
          saleTypes: ${salesType}
        }
      ) {
        chainTokenPrice
        totalCount
        usdcPrice
      }
    }
  }`
}
