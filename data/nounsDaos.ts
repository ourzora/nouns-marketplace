import gql from 'graphql-tag'

export const NOUNS_DAOS_QUERY = gql`
  query NounsDaos($network: NetworkInput!, $limit: Int!, $after: String) {
    nouns {
      nounsDaos(networks: [$network], pagination: { limit: $limit, after: $after }) {
        nodes {
          name
          collectionAddress
          auctionAddress
          governorAddress
          metadataAddress
          description
          symbol
          totalSupply
          treasuryAddress
          totalSupply
          contractAddress
          networkInfo {
            chain
            network
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          limit
        }
      }
    }
  }
`
