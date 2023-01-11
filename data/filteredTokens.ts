import gql from 'graphql-tag'

export const FILTERED_TOKENS = gql`
  query FilteredTokens(
    $where: TokensQueryInput
    $sort: TokenSortInput
    $filter: TokensQueryFilter
    $pagination: PaginationInput
    $networks: [NetworkInput!]
  ) {
    tokens(
      where: $where
      sort: $sort
      filter: $filter
      pagination: $pagination
      networks: $networks
    ) {
      pageInfo {
        endCursor
        hasNextPage
        limit
      }
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
          owner
        }
        marketsSummary {
          collectionAddress
          marketAddress
          marketType
          properties {
            ... on V1Offer {
              __typename
              address
              amount {
                nativePrice {
                  decimal
                  raw
                }
                usdcPrice {
                  decimal
                  raw
                }
              }
              bidder
              collectionAddress
              currency
              recipient
              sellOnShare
              tokenId
              v1OfferStatus
            }
            ... on V3Ask {
              __typename
              address
              askCurrency
              askPrice {
                nativePrice {
                  decimal
                  raw
                }
                usdcPrice {
                  decimal
                  raw
                }
              }
              buyer
              collectionAddress
              seller
              tokenId
              v3AskStatus
            }
            ... on V3ReserveAuction {
              __typename
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
              seller
              sellerFundsRecipient
              startTime
              status
              tokenId
              price {
                nativePrice {
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
          price {
            nativePrice {
              decimal
              raw
            }
            usdcPrice {
              decimal
              raw
            }
          }
          status
          tokenId
        }

        token {
          collectionAddress
          collectionName
          networkInfo {
            chain
            network
          }
          attributes {
            displayType
            traitType
            value
          }
          content {
            mediaEncoding {
              ... on ImageEncodingTypes {
                large
                poster
                original
                thumbnail
              }
              ... on UnsupportedEncodingTypes {
                __typename
                original
              }
              ... on AudioEncodingTypes {
                large
                original
              }
              ... on VideoEncodingTypes {
                large
                poster
                original
                preview
                thumbnail
              }
            }
            mimeType
            size
            url
          }
          tokenUrlMimeType
          tokenUrl
          tokenId
          name
          metadata
          image {
            mimeType
            url
            size
            mediaEncoding {
              ... on ImageEncodingTypes {
                large
                poster
                original
                thumbnail
              }
              ... on VideoEncodingTypes {
                large
                poster
                original
                preview
                thumbnail
              }
              ... on AudioEncodingTypes {
                large
                original
              }
              ... on UnsupportedEncodingTypes {
                __typename
                original
              }
            }
          }
          description
          lastRefreshTime
          owner
          tokenContract {
            totalSupply
            symbol
            network
            name
            description
            collectionAddress
            chain
          }
        }
      }
    }
  }
`
