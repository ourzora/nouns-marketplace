import { useMemo } from 'react'
import { StatBlock } from './StatBlock'
import { useAggregate } from 'hooks'
import { roundFourDecimals, roundTwoDecimals, numberFormatter } from '@shared'

export function CollectionStats({ contractAddress }: { contractAddress: string }) {
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
    <>
      <StatBlock statType="Volume" statValue={`${volume} ETH`} />
      <StatBlock statType="USDC Volume" statValue={`$${usdcPrice}`} />
    </>
  )
}
