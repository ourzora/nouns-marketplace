import gql from 'graphql-tag'

export const NOUNS_DAOS_QUERY = gql`
  query NounsDaos($network: NetworkInput!, $limit: Int!) {
    nouns {
      nounsDaos(networks: [$network], pagination: { limit: $limit }) {
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
      }
    }
  }
`
