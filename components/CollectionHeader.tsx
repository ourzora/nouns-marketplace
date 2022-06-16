import { Stack, Display, Paragraph } from '@zoralabs/zord'
import {
  Collection,
  CollectionStatsAggregateQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { lightFont } from 'styles/styles.css'
import { AddressWithLink } from '@market'

export function CollectionHeader({
  collection,
  aggregateStats,
}: {
  collection: Collection
  aggregateStats: CollectionStatsAggregateQuery
}) {
  return (
    <Stack align="center" w="100%" px="x4">
      <Display as="h1">{collection.name}</Display>
      <Paragraph size="lg" className={lightFont} color="tertiary">
        {aggregateStats.aggregateStat.nftCount} NFTs
      </Paragraph>
      <AddressWithLink
        address={collection.address}
        useEns={false}
        backgroundColor="secondary"
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
