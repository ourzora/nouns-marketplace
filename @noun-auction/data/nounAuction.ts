export function nounAuction(tokenId: any) {
  return `{
    markets(
      filter: {
        marketFilters: {
          marketType: NOUNS_AUCTION,
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
    token(token: 
      {
        address: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03",
        tokenId: "${tokenId}",
      }
    ) {
      markets {
        marketType
        status
      }
    }
    events(
      filter: {
        eventTypes: NOUNS_AUCTION_EVENT
      }, 
      where: {
        tokens: {
          tokenId: "${tokenId}",
          address: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03"
        }
      }, 
      sort: {
        sortKey: CREATED,
        sortDirection: DESC
      }, 
      pagination: {
        limit:500
      }
    ) {
      nodes {
        eventType
        collectionAddress
        properties {
          ... on NounsAuctionEvent {
            nounsAuctionEventType
            properties {
              ... on NounsAuctionBidEventProperties {
                sender
                value
                nounId
                extended
              }
            }
          }
        }
        tokenId
        transactionInfo {
          transactionHash
          blockNumber
          blockTimestamp
        }
      }
    }
  }`
}
