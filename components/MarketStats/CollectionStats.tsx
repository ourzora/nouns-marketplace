import { useAggregate } from 'hooks'

import { useMemo } from 'react'

import {
  numberFormatter,
  numberFormatterUSDC,
  roundFourDecimals,
  roundTwoDecimals,
} from '@shared'

import { StatBlock } from './StatBlock'

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
