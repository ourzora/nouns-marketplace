import gql from 'graphql-tag'

export const TOKEN_QUERY = gql`
  query Token($collectionAddress: String!, $tokenId: String!, $network: NetworkInput) {
    token(token: { address: $collectionAddress, tokenId: $tokenId }, network: $network) {
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
        mintInfo {
          toAddress
          originatorAddress
          price {
            blockNumber
            chainTokenPrice {
              currency {
                address
                decimals
                name
              }
              decimal
              raw
            }
            nativePrice {
              currency {
                address
                decimals
                name
              }
              decimal
              raw
            }
            usdcPrice {
              currency {
                address
                decimals
                name
              }
              decimal
              raw
            }
          }
          mintContext {
            blockTimestamp
            blockNumber
          }
        }
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
`
