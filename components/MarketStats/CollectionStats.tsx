import { StatBlock } from './StatBlock'
import { useAggregate } from 'hooks'
import { roundFourDecimals, roundTwoDecimals, numberFormatter } from '@shared'

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
