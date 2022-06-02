import { useMemo } from 'react'
import { Flex, Text, Stack } from '@zoralabs/zord'
import { CollectionStatsAggregateQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { lightFont } from 'styles/styles.css'
import { roundFourDecimals, roundTwoDecimals } from 'utils/math'

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

  const volume = useMemo(
    () => roundFourDecimals(aggregateStat?.salesVolume?.chainTokenPrice),
    [aggregateStat?.salesVolume?.chainTokenPrice]
  )
  const usdcPrice = useMemo(
    () => roundTwoDecimals(aggregateStat?.salesVolume?.usdcPrice),
    [aggregateStat?.salesVolume?.usdcPrice]
  )

  return (
    <Flex justify="center" mb="x10">
      <Flex gap="x4">
        <StatBlock statType="Owners" statValue={aggregateStat?.ownerCount} />
        <StatBlock statType="Items" statValue={aggregateStat?.nftCount} />
        <StatBlock
          statType="Floor Price"
          statValue={`${
            aggregateStat?.floorPrice === null ? '0' : aggregateStat.floorPrice
          } ETH`}
        />
        <StatBlock statType="Volume" statValue={`${volume} ETH`} />
        <StatBlock statType="USDC Volume" statValue={`$${usdcPrice}`} />
      </Flex>
    </Flex>
  )
}
