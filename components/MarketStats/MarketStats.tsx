import { useAggregate } from 'hooks'

import { Flex, FlexProps } from '@zord'

import { DaoStats } from './DaoStats'
import { StatBlock } from './StatBlock'

export interface MarketStatsProps extends FlexProps {
  contractAddress: string
}

export function MarketStats({ contractAddress, className, ...props }: MarketStatsProps) {
  const { floorPrice, nftCount, ownerCount } = useAggregate(contractAddress)

  return (
    <Flex className={className} {...props}>
      <Flex
        gap="x4"
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
      </Flex>
    </Flex>
  )
}
