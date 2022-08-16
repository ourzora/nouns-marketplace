import { useMemo, useEffect } from 'react'
import { Flex, Text, Stack, FlexProps, Box } from '@zoralabs/zord'
import { marketStatsWrapper, stat } from 'styles/styles.css'
import { roundFourDecimals, roundTwoDecimals } from '@shared'
import { numberFormatter } from '@shared'
import { useAggregate } from 'hooks'

import { lightFont } from '@shared'
import { RawDisplayer } from './utils'

export interface MarketStatesProps extends FlexProps {
  contractAddress: string
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

export function MarketStats({ contractAddress, ...props }: MarketStatesProps) {
  const { aggregate } = useAggregate(contractAddress)

  const volume = useMemo(
    () =>
      numberFormatter(
        roundFourDecimals(
          aggregate?.aggregateStat?.salesVolume?.chainTokenPrice as number
        )
      ),
    [aggregate?.aggregateStat?.salesVolume?.chainTokenPrice]
  )
  const usdcPrice = useMemo(
    () =>
      numberFormatter(
        roundTwoDecimals(aggregate?.aggregateStat?.salesVolume?.usdcPrice as number)
      ),
    [aggregate?.aggregateStat?.salesVolume?.usdcPrice]
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
          statValue={numberFormatter(aggregate?.aggregateStat?.ownerCount as number)}
        />
        <StatBlock
          statType="Items"
          statValue={numberFormatter(aggregate?.aggregateStat?.nftCount as number)}
        />
        <StatBlock
          statType="Floor Price"
          statValue={`${
            aggregate?.aggregateStat?.floorPrice === null
              ? '0'
              : aggregate?.aggregateStat.floorPrice
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
      <RawDisplayer data={aggregate} />
    </Flex>
  )
}
