export function activeNounAuction(auctionType: 'NOUNS_AUCTION') {
  return `{
    markets(
      filter: {
        marketFilters: {
          marketType: ${auctionType},
          statuses: ACTIVE
        }
      }, 
      sort: {
        sortKey: NONE,
        sortDirection: DESC
      },
      pagination: {
        limit: 1
      }) {
      nodes {
        market {
          status
          tokenId
          price {
            chainTokenPrice {
              decimal
            }
          }
          properties {
            ... on NounsAuction {
              firstBidTime
              highestBidder
              highestBidPrice {
                chainTokenPrice {
                  decimal
                }
                usdcPrice {
                  decimal
                }
              }
              duration
              endTime
              auctionId
              reservePrice {
                nativePrice {
                  decimal
                }
                usdcPrice {
                  decimal
                }
              }
              startTime
              winner
              estimatedDurationTime
              amount {
                chainTokenPrice {
                  decimal
                }
                usdcPrice {
                  decimal
                }
              }
            }
          }
          collectionAddress
          marketAddress
          marketType
          transactionInfo {
            transactionHash
            blockNumber
            blockTimestamp
          }
        }
      }
    }
  }`
}
