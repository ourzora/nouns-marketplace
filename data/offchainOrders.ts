import gql from 'graphql-tag'

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
