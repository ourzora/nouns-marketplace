import gql from 'graphql-tag'

export const AGG_STAT_QUERY = gql`
  query AggStat($addresses: String![], $network: NetworkInput!) {
    aggregateStat {
      floorPrice(where: { collectionAddresses: $addresses }, networks: [$network])
      nftCount(where: { collectionAddresses: $addresses }, networks: [$network])
      ownerCount(where: { collectionAddresses: $addresses })
      salesVolume(where: { collectionAddresses: $addresses }, networks: [$network]) {
        chainTokenPrice
        totalCount
        usdcPrice
      }
    }
  }
`
