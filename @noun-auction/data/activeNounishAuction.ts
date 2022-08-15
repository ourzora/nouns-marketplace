import { returnMarketProps } from '@noun-auction/constants'
import { NounishMarketTypes } from '@noun-auction/typings'

export function activeNounishAuction(marketType?: string) {
  const marketProps = returnMarketProps(marketType as NounishMarketTypes)
  return `{
    market(where: {marketType: ${marketProps?.activeAuctionType}}) {
      collectionAddress
      marketAddress
      marketType
      properties {
        ... on ${marketProps?.propertyType} {
          auctionId
          tokenId
          auctionCurrency
          startTime
          endTime
          duration
          estimatedDurationTime
          firstBidTime
          minBidIncrementPercentage
          timeBuffer
          highestBidder
          winner
          highestBidPrice {
            chainTokenPrice {
              decimal
              raw
            }
            usdcPrice {
              decimal
              raw
            }
          }
        }
      }
    }
  }
`
}
