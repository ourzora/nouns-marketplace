import gql from 'graphql-tag'

export const NOUNS_DAOS_QUERY = gql`
  query NounsDaos($network: NetworkInput!) {
    nouns {
      nounsDaos(networks: [$network], pagination: { limit: 30 }) {
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
