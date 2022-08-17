import { returnMarketProps } from '@noun-auction/constants'
import { NounishMarketTypes } from '@noun-auction/typings'

export function activeNounishAuction(marketType?: NounishMarketTypes) {
  const marketProps = returnMarketProps(marketType)
  return `{
    market(where: {marketType: ${marketProps?.activeAuctionType}}) {
      collectionAddress
      marketAddress
      marketType
      properties {
        ... on ${marketProps?.propertyType} {
          tokenId
          startTime
          endTime
          minBidIncrementPercentage
          highestBidder
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
          reservePrice {
            chainTokenPrice {
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
