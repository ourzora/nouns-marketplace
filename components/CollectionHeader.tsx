import { Stack, Paragraph } from '@zoralabs/zord'
import {
  Collection,
  CollectionStatsAggregateQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { AddressWithLink } from '@market'
import { PageHeader } from './PageHeader'
import { clickAnimation } from 'styles/styles.css'

export function CollectionHeader({
  collection,
  aggregateStats,
}: {
  collection: Collection
  aggregateStats: CollectionStatsAggregateQuery
}) {
  return (
    <Stack align="center" w="100%" px="x4">
      <PageHeader
        headline={collection.name}
        copy={`${aggregateStats.aggregateStat.nftCount} NFTs`}
      />
      <AddressWithLink
        address={collection.address}
        useEns={false}
        className={clickAnimation}
        backgroundColor="tertiary"
        px="x4"
        py="x2"
        borderRadius="curved"
        mt="x2"
        mb="x2"
      />
      {collection.description !== "''" && collection.description && (
        <Paragraph>{collection.description}</Paragraph>
      )}
    </Stack>
  )
}
