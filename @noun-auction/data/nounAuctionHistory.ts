export function nounAuctionHistory(
  tokenId: string,
  contractAddress: string,
  eventType: 'NOUNS_AUCTION_EVENT'
) {
  return `{
    token(token: 
      {
        address: "${contractAddress}",
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
        eventTypes: ${eventType}
      }, 
      where: {
        tokens: {
          tokenId: "${tokenId}",
          address: "${contractAddress}"
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
