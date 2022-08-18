import { useMemo } from 'react'
import { Box } from '@zoralabs/zord'
import { roundFourDecimals, numberFormatter } from '@shared'
import { useAuctionVolume, useAggregate } from 'hooks'
import { returnDao } from 'constants/collection-addresses'
import { StatBlock } from './StatBlock'

export function DaoStats({ contractAddress }: { contractAddress: string }) {
  const { aggregate } = useAggregate(contractAddress)
  const dao = returnDao(contractAddress)
  /* @ts-ignore */
  const { data } = useAuctionVolume(contractAddress, `${dao?.marketType}_SALE`)

  const auctionVolume = useMemo(() => {
    if (data?.chainTokenPrice) {
      return `${numberFormatter(roundFourDecimals(data?.chainTokenPrice as number))} ETH`
    } else {
      return '...'
    }
  }, [data, data?.chainTokenPrice])

  const secondaryVolume = useMemo(() => {
    if (data?.chainTokenPrice && aggregate?.aggregateStat?.salesVolume?.chainTokenPrice) {
      const calcSecondaryVolume =
        aggregate?.aggregateStat?.salesVolume?.chainTokenPrice - data?.chainTokenPrice
      return `${numberFormatter(roundFourDecimals(calcSecondaryVolume as number))} ETH`
    } else {
      return '...'
    }
  }, [data, aggregate, aggregate?.aggregateStat?.salesVolume?.chainTokenPrice])

  return (
    <>
      <StatBlock statType="Total Auction Volume" statValue={auctionVolume} />
      <StatBlock statType="Secondary Sales Volume" statValue={secondaryVolume} />
    </>
  )
}
