export function nounAuction(tokenId: any) {
  return `{
    events(
      filter: {
        eventTypes: NOUNS_AUCTION_EVENT
      }, 
      where: {
        tokens: {
          tokenId: ${tokenId},
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
      }
    }
  }`
}
