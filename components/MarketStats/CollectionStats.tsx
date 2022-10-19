import { useAggregate } from 'hooks'

import { numberFormatter, roundFourDecimals, roundTwoDecimals } from '@shared'

import { StatBlock } from './StatBlock'

export function CollectionStats({ contractAddress }: { contractAddress: string }) {
  const { aggregate } = useAggregate(contractAddress)

  const volume =
    `${numberFormatter(
      roundFourDecimals(aggregate?.aggregateStat?.salesVolume?.chainTokenPrice)
    )} ETH` ?? '...'

  const usdcPrice =
    `$${numberFormatter(
      roundTwoDecimals(aggregate?.aggregateStat?.salesVolume?.usdcPrice)
    )}` ?? '...'

  return (
    <>
      <StatBlock statType="Volume" statValue={volume} />
      <StatBlock statType="USDC Volume" statValue={usdcPrice} />
    </>
  )
}
