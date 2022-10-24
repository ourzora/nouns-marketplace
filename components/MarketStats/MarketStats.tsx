import { returnDao } from 'constants/collection-addresses'
import { marketStatsWrapper } from 'styles/styles.css'

import { useAggregate } from 'hooks'

import { useMemo } from 'react'

import { numberFormatter } from '@shared'
import { Box, Flex, FlexProps } from '@zoralabs/zord'

import { CollectionStats } from './CollectionStats'
import { DaoStats } from './DaoStats'
import { StatBlock } from './StatBlock'

export interface MarketStatesProps extends FlexProps {
  contractAddress: string
}

export function MarketStats({ contractAddress, ...props }: MarketStatesProps) {
  const { aggregate } = useAggregate(contractAddress)
  const dao = returnDao(contractAddress)

  const ownerCount = useMemo(
    () => numberFormatter(aggregate?.aggregateStat?.ownerCount),
    [aggregate?.aggregateStat?.ownerCount]
  )
  const nftCount = useMemo(
    () => numberFormatter(aggregate?.aggregateStat?.nftCount),
    [aggregate?.aggregateStat?.nftCount]
  )
  const floorPrice = aggregate?.aggregateStat?.floorPrice ?? '0'

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
        <StatBlock statType="Owners" statValue={ownerCount} />
        <StatBlock statType="Items" statValue={nftCount} />
        <StatBlock statType="Floor Price" statValue={`${floorPrice} ETH`} />
        {dao ? (
          <DaoStats contractAddress={contractAddress} />
        ) : (
          <CollectionStats contractAddress={contractAddress} />
        )}
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
