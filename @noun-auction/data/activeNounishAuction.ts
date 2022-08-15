export function activeNounishAuction() {
  return `{
    market(where: {marketType: ACTIVE_LIL_NOUNS_AUCTION}) {
      collectionAddress
      marketAddress
      marketType
      properties {
        ... on LilNounsAuction {
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
        }
      }
    }
  }
`
}
