import gql from 'graphql-tag'

export const ONE_NOUNS_DAO = gql`
  query OneNounsDao($network: NetworkInput!, $collectionAddress: String!) {
    nouns {
      nounsDaos(
        where: { collectionAddresses: [$collectionAddress] }
        networks: [$network]
      ) {
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
