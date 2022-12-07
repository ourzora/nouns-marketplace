import { marketStatsWrapper } from 'styles/styles.css'

import { useAggregate } from 'hooks'

import { useMemo } from 'react'

import { Box, Flex, FlexProps } from '@zoralabs/zord'

import { DaoStats } from './DaoStats'
import { StatBlock } from './StatBlock'

export interface MarketStatsProps extends FlexProps {
  contractAddress: string
}

export function MarketStats({ contractAddress, ...props }: MarketStatsProps) {
  const { floorPrice, nftCount, ownerCount } = useAggregate(contractAddress)

  return useMemo(
    () => (
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
          <StatBlock
            statType="Floor Price"
            statValue={floorPrice ? `${floorPrice} ETH` : '...'}
          />
          <DaoStats contractAddress={contractAddress} />

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
    ),
    [contractAddress, floorPrice, nftCount, ownerCount, props]
  )
}
