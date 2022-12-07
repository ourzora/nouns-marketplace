import gql from 'graphql-tag'

export const TOKENS_BY_ADDRESS_QUERY = gql`
  query NounsTokensByOwnerAddress($ownerAddress: String!) {
    tokens(where: { ownerAddresses: [$ownerAddress] }) {
      nodes {
        token {
          collectionAddress
          collectionName
          description
          image {
            url
            size
            mimeType
            mediaEncoding {
              ... on ImageEncodingTypes {
                large
                poster
              }
            }
          }
          lastRefreshTime
          metadata
          name
          tokenContract {
            collectionAddress
            symbol
            totalSupply
          }
          tokenId
        }
        marketsSummary {
          collectionAddress
          marketAddress
          marketType
          properties {
            ... on V3Ask {
              address
              askCurrency
              askPrice {
                blockNumber
              }
              buyer
              collectionAddress
              seller
              tokenId
              v3AskStatus
            }
            ... on V3ReserveAuction {
              estimatedDurationTime
              address
              collectionAddress
              currency
              duration
              extended
              finder
              findersFeeBps
              firstBid
              firstBidTime
              highestBid
              highestBidder
              reserve
              highestBidPrice {
                blockNumber
                usdcPrice {
                  decimal
                  raw
                }
                nativePrice {
                  decimal
                  raw
                }
              }
              reservePrice {
                usdcPrice {
                  decimal
                  raw
                }
                nativePrice {
                  decimal
                  raw
                }
              }
              seller
              sellerFundsRecipient
              startTime
              status
              tokenId
            }
          }
        }
      }
    }
  }
`
