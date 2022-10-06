import { Flex, FlexProps, Box } from '@zoralabs/zord'
import { marketStatsWrapper } from 'styles/styles.css'
import { numberFormatter } from '@shared'
import { useAggregate } from 'hooks'
import { StatBlock } from './StatBlock'
import { CollectionStats } from './CollectionStats'
import { DaoStats } from './DaoStats'
import { returnDao } from 'constants/collection-addresses'
import { useMemo } from 'react'

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
