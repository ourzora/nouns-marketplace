import { StatBlock } from './StatBlock'
import { useAggregate } from 'hooks'
import {
  roundFourDecimals,
  roundTwoDecimals,
  numberFormatter,
  numberFormatterUSDC,
} from '@shared'
import { useMemo } from 'react'

export function CollectionStats({ contractAddress }: { contractAddress: string }) {
  const { aggregate } = useAggregate(contractAddress)

  const volume = useMemo(
    () =>
      `${numberFormatter(
        roundFourDecimals(aggregate?.aggregateStat?.salesVolume?.chainTokenPrice)
      )} ETH` ?? '...',
    [aggregate]
  )

  const usdcPrice = useMemo(
    () =>
      `${numberFormatterUSDC(
        roundTwoDecimals(aggregate?.aggregateStat?.salesVolume?.usdcPrice)
      )}` ?? '...',
    [aggregate]
  )

  return (
    <>
      <StatBlock statType="Volume" statValue={volume} />
      <StatBlock statType="USDC Volume" statValue={usdcPrice} />
    </>
  )
}
