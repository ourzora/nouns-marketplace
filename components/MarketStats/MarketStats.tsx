import { useMemo } from 'react'
import { Flex, FlexProps, Box } from '@zoralabs/zord'
import { marketStatsWrapper } from 'styles/styles.css'
import { numberFormatter } from '@shared'
import { useAggregate } from 'hooks'
import { StatBlock } from './StatBlock'
import { CollectionStats } from './CollectionStats'
import { DaoStats } from './DaoStats'
import { returnDao } from 'constants/collection-addresses'

export interface MarketStatesProps extends FlexProps {
  contractAddress: string
}

export function MarketStats({ contractAddress, ...props }: MarketStatesProps) {
  const { aggregate } = useAggregate(contractAddress)
  const dao = returnDao(contractAddress)

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
