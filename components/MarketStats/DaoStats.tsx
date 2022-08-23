import { useMemo } from 'react'
import { roundFourDecimals, numberFormatter } from '@shared'
import { useAuctionVolume, useAggregate } from 'hooks'
import { returnDao } from 'constants/collection-addresses'
import { StatBlock } from './StatBlock'

export function DaoStats({ contractAddress }: { contractAddress: string }) {
  const { aggregate } = useAggregate(contractAddress)
  const dao = returnDao(contractAddress)
  const { data } = useAuctionVolume(
    contractAddress,
    dao?.marketType ? `${dao.marketType}_SALE` : undefined
  )

  const auctionVolumeReturn = data?.chainTokenPrice
  const allVolumeReturn = aggregate?.aggregateStat?.salesVolume?.chainTokenPrice

  const auctionVolume = useMemo(
    () => `${numberFormatter(roundFourDecimals(auctionVolumeReturn))} ETH` ?? '...',
    [auctionVolumeReturn]
  )

  const secondaryVolume = useMemo(() => {
    if (auctionVolumeReturn && allVolumeReturn) {
      const calcSecondaryVolume = allVolumeReturn - auctionVolumeReturn
      return `${numberFormatter(roundFourDecimals(calcSecondaryVolume))} ETH`
    } else {
      return '...'
    }
  }, [auctionVolumeReturn, allVolumeReturn])

  return (
    <>
      <StatBlock statType="Total Auction Volume" statValue={auctionVolume} />
      <StatBlock statType="Secondary Sales Volume" statValue={secondaryVolume} />
    </>
  )
}
