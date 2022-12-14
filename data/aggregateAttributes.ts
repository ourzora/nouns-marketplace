import gql from 'graphql-tag'

export const AGGREGATE_ATTRIBUTE_QUERY = gql`
  query Attributes($addresses: [String!], $network: NetworkInput!) {
    aggregateAttributes(
      where: { collectionAddresses: $addresses }
      networks: [$network]
    ) {
      traitType
      valueMetrics {
        count
        percent
        value
      }
    }
  }
`
