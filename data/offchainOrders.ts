import gql from 'graphql-tag'

// export const OFFCHAIN_ORDER_FOR_TOKEN_QUERY = gql`
//   query offchainOrderForToken($tokenId: String!, $tokenAddress: String!, $networkInput: NetworkInput!) {
//     offchainOrders(
//       where: { tokens: { address: $tokenAddress, tokenId: $tokenId } }
//       networks: $networkInput
//     ) {
//       nodes {
//         offchainOrder {
//           calldata
//           contractAddress
//           price {
//             chainTokenPrice {
//               decimal
//             }
//             usdcPrice {
//               decimal
//             }
//           }
//         }
//         token {
//           collectionName
//           tokenId
//         }
//       }
//     }
//   }
// `

export const OFFCHAIN_ORDER_FOR_TOKEN_QUERY = gql`
  query offchainOrderForToken(
    $tokenId: String!
    $tokenAddress: String!
    $network: Network!
    $chain: Chain!
  ) {
    offchainOrders(
      where: { tokens: { address: $tokenAddress, tokenId: $tokenId } }
      networks: { network: $network, chain: $chain }
    ) {
      nodes {
        offchainOrder {
          calldata
          contractAddress
          price {
            chainTokenPrice {
              decimal
            }
            usdcPrice {
              decimal
            }
          }
        }
        token {
          collectionName
          tokenId
        }
      }
    }
  }
`
