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
  const { salesVolume } = useAggregate(contractAddress)

  const volume = useMemo(
    () =>
      `${numberFormatter(roundFourDecimals(salesVolume?.chainTokenPrice))} ETH` ?? '...',
    [salesVolume]
  )

  const usdcPrice = useMemo(
    () => `${numberFormatterUSDC(roundTwoDecimals(salesVolume?.usdcPrice))}` ?? '...',
    [salesVolume]
  )

  return (
    <>
      <StatBlock statType="Volume" statValue={volume} />
      <StatBlock statType="USDC Volume" statValue={usdcPrice} />
    </>
  )
}
