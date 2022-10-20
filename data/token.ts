import gql from 'graphql-tag'

export const TOKEN_QUERY = gql`
  query Token($address: String!, $tokenId: String!, $network: NetworkInput) {
    token(token: { address: $address, tokenId: $tokenId }, network: $network) {
      token {
        collectionAddress
        collectionName
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
        }
        description
      }
    }
  }
`
