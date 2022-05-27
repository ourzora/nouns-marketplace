import { Flex, Text, Stack } from '@zoralabs/zord/elements'
import { CollectionStatsAggregateQuery } from '@zoralabs/zdk-alpha/dist/queries/queries-sdk'
import { lightFont } from 'styles/styles.css'

export function StatBlock({
  statType,
  statValue,
}: {
  statType: string
  statValue: string | number | null | undefined
}) {
  return (
    <Stack p="x4" backgroundColor="tertiary" borderRadius="phat" gap="x1">
      <Text variant="heading-xs" color="secondary" className={lightFont}>
        {statType}
      </Text>
      <Text variant="heading-xs" className={lightFont}>
        {statValue}
      </Text>
    </Stack>
  )
}

export function MarketStats({
  aggregateStats,
}: {
  aggregateStats: CollectionStatsAggregateQuery
}) {
  const { aggregateStat } = aggregateStats
  return (
    <Flex justify="center" mb="x10">
      <Flex gap="x4">
        <StatBlock statType="Owners" statValue={aggregateStat?.ownerCount} />
        <StatBlock statType="Items" statValue={aggregateStat?.nftCount} />
        <StatBlock
          statType="Floor Price"
          statValue={`${aggregateStat?.floorPrice} ETH`}
        />
        <StatBlock
          statType="Volume"
          statValue={`${aggregateStat?.salesVolume?.ethPrice} ETH`}
        />
        <StatBlock
          statType="USDC Volume"
          statValue={`$${aggregateStat?.salesVolume?.usdcPrice}`}
        />
      </Flex>
    </Flex>
  )
}
