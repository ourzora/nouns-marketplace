import gql from 'graphql-tag'

// LILNOUNS 0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b
// OPEN ORDERS: 3169 2389 225 3404 3143

export const OFFCHAIN_ORDER_FOR_TOKEN_QUERY = gql`
  query offchainOrderForToken($tokenId: String!, $tokenAddress: String!) {
    offchainOrders(
      where: { tokens: { address: $tokenAddress, tokenId: $tokenId } }
      networks: { network: ETHEREUM, chain: MAINNET }
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
