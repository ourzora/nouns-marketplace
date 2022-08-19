import { NFTObject } from '@zoralabs/nft-hooks'
import { FixedPriceLike, MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types'
import { useMemo } from 'react'

interface AskTokenHelperProps {
  ask: FixedPriceLike
}

export const useAskTokenHelper = ({ ask }: AskTokenHelperProps) => {
  const isPrivateAsk = useMemo(() => ask?.raw?.properties?.buyer || false, [ask])
  const buyerAddress = useMemo(() => ask?.raw?.properties?.buyer, [ask])
  const hasActiveAsk = useMemo(
    () => (ask && ask.status === MARKET_INFO_STATUSES.ACTIVE) || false,
    [ask]
  )
  const hasAsk = useMemo(() => ask !== undefined, [ask])

  return {
    hasAsk,
    isPrivateAsk,
    hasActiveAsk,
    buyerAddress,
  }
}
