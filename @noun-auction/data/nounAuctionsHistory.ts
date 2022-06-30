export function nounAuctionsHistoryQuery(pagination?: number) {
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

/*
query MyQuery {
  markets(filter: {marketFilters: {marketType: NOUNS_AUCTION, statuses: [COMPLETED, ACTIVE]}}, sort: {sortKey: NONE, sortDirection: DESC}, pagination: {limit: 50}) {
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
            }
          }
        }
      }
    }
  }
}

*/

/*
  query MyQuery {
  events(filter: {eventTypes: NOUNS_AUCTION_EVENT}, networks: {network: ETHEREUM, chain: MAINNET}, where: {tokens: {tokenId: "357", address: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03"}}) {
    nodes {
      transactionInfo {
        blockNumber
        blockTimestamp
        logIndex
        transactionHash
      }
      eventType
      collectionAddress
      tokenId
    }
  }
}
*/
