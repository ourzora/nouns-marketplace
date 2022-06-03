import { Stack, Display, Paragraph } from '@zoralabs/zord'
import {
  Collection,
  CollectionStatsAggregateQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { lightFont } from 'styles/styles.css'

export function CollectionHeader({
  collection,
  aggregateStats,
}: {
  collection: Collection
  aggregateStats: CollectionStatsAggregateQuery
}) {
  return (
    <Stack align="center">
      <Display>{collection.name}</Display>
      <Paragraph size="lg" className={lightFont} color="tertiary">
        {aggregateStats.aggregateStat.nftCount} NFTs
      </Paragraph>
      {collection.description !== "''" && collection.description && (
        <Paragraph>{collection.description}</Paragraph>
      )}
    </Stack>
  )
}
