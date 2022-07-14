export function nounishAuctionsListQuery(pagination?: number) {
  return `{
    markets(
      filter: {
        marketFilters: {
          marketType: NOUNS_AUCTION,
          statuses: [COMPLETED, ACTIVE]
        }
      }, 
      sort: {
        sortKey: NONE, 
        sortDirection: DESC
      },
      pagination: {
        limit: ${pagination || 50}
      })
    {
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
            }
          }
        }
      }
    }
  }`
}
