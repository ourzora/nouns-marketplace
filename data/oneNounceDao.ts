import gql from 'graphql-tag'

export const ONE_NOUNS_DAO = gql`
  query OneNounsDao($network: NetworkInput!, $address: String!) {
    nouns {
      nounsDaos(where: { collectionAddresses: [$address] }, networks: [$network]) {
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
