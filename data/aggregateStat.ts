import gql from 'graphql-tag'

export const AGG_STAT_QUERY = gql`
  query AggStat($address: String!, $network: NetworkInput!) {
    aggregateStat {
      floorPrice(where: { collectionAddresses: [$address] }, networks: [$network])
      nftCount(where: { collectionAddresses: [$address] }, networks: [$network])
      ownerCount(where: { collectionAddresses: [$address] })
      salesVolume(where: { collectionAddresses: [$address] }, networks: [$network]) {
        chainTokenPrice
        totalCount
        usdcPrice
      }
    }
  }
`
