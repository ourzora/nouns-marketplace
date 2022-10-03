import { isAddressMatch, numberFormatter, roundTwoDecimals, useAuth } from '@shared'
import { FixedPriceLike, MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types'
import { useMemo } from 'react'

interface AskHelperProps {
  ask: FixedPriceLike
}

export const useAskHelper = ({ ask }: AskHelperProps) => {
  const { balance: walletBalance, address: userAddress } = useAuth()
  const buyerAddress = useMemo(() => ask?.raw?.properties?.buyer, [ask])
  const isPrivateAsk = useMemo(() => buyerAddress || false, [buyerAddress])
  const isActiveAsk = useMemo(
    () => ask?.status === MARKET_INFO_STATUSES.ACTIVE || false,
    [ask]
  )
  const hasActivePrivateAsk = useMemo(
    () => isActiveAsk && isPrivateAsk,
    [isActiveAsk, isPrivateAsk]
  )
  const isCompletedAsk = useMemo(
    () => ask?.status === MARKET_INFO_STATUSES.COMPLETE || false,
    [ask]
  )
  const hasAsk = useMemo(() => ask !== undefined, [ask])
  const hasRelevantAsk = useMemo(() => hasAsk && isActiveAsk, [hasAsk, isActiveAsk])

  const rawAskAmount = useMemo(() => ask?.amount?.amount.raw.toString(), [ask])
  const displayAskAmount = useMemo(() => ask?.amount?.amount.value.toString(), [ask])
  const usdAskAmount = useMemo(
    () =>
      ask?.amount?.usd?.value
        ? numberFormatter(roundTwoDecimals(ask?.amount?.usd?.value))
        : '...',
    [ask]
  )
  const hasSufficientFunds = useMemo(
    () => (rawAskAmount ? walletBalance?.value.gte(rawAskAmount) : false),
    [rawAskAmount, walletBalance?.value]
  )
  const isValidPrivateAskBuyer = useMemo(
    () => hasActivePrivateAsk && isAddressMatch(userAddress, buyerAddress),
    [buyerAddress, hasActivePrivateAsk, userAddress]
  )

  return {
    hasAsk,
    hasRelevantAsk,
    isPrivateAsk,
    isActiveAsk,
    hasActivePrivateAsk,
    isCompletedAsk,
    buyerAddress,
    isValidPrivateAskBuyer,
    rawAskAmount,
    displayAskAmount,
    usdAskAmount,
    hasSufficientFunds,
  }
}
