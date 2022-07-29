import { useMemo } from 'react'
import { Flex, Text, Stack, FlexProps, Box } from '@zoralabs/zord'
import { CollectionStatsAggregateQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { lightFont } from 'styles/styles.css'
import { marketStatsWrapper, stat } from './MarketComponents.css'
import { roundFourDecimals, roundTwoDecimals } from 'utils/math'
import { numberFormatter } from 'utils/numbers'

export interface MarketStatesProps extends FlexProps {
  aggregateStats: CollectionStatsAggregateQuery
}

export function StatBlock({
  statType,
  statValue,
}: {
  statType: string
  statValue: string | number | null | undefined
}) {
  return (
    <Stack
      p="x4"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      borderRadius="phat"
    >
      <Text
        /* @ts-ignore */
        variant={['heading-xs, heading-xl']}
        color="secondary"
        className={[lightFont, stat]}
      >
        {statType}
      </Text>
      <Text variant="heading-xs" className={[lightFont, stat]}>
        {statValue}
      </Text>
    </Stack>
  )
}

export function MarketStats({ aggregateStats, ...props }: MarketStatesProps) {
  const { aggregateStat } = aggregateStats

  const volume = useMemo(
    () => numberFormatter(roundFourDecimals(aggregateStat?.salesVolume?.chainTokenPrice)),
    [aggregateStat?.salesVolume?.chainTokenPrice]
  )
  const usdcPrice = useMemo(
    () => numberFormatter(roundTwoDecimals(aggregateStat?.salesVolume?.usdcPrice)),
    [aggregateStat?.salesVolume?.usdcPrice]
  )

  return (
    <Flex className={marketStatsWrapper} {...props}>
      <Flex
        gap="x4"
        w="100%"
        justify={{
          '@initial': 'flex-start',
          '@1024': 'center',
        }}
      >
        <StatBlock
          statType="Owners"
          statValue={numberFormatter(aggregateStat?.ownerCount)}
        />
        <StatBlock
          statType="Items"
          statValue={numberFormatter(aggregateStat?.nftCount)}
        />
        <StatBlock
          statType="Floor Price"
          statValue={`${
            aggregateStat?.floorPrice === null ? '0' : aggregateStat.floorPrice
          } ETH`}
        />
        <StatBlock statType="Volume" statValue={`${volume} ETH`} />
        <StatBlock statType="USDC Volume" statValue={`$${usdcPrice}`} />
        <Box
          style={{ paddingLeft: '1px' }}
          h="100%"
          position="relative"
          display={{
            '@initial': 'block',
            '@1024': 'none',
          }}
        />
      </Flex>
    </Flex>
  )
}
