import { useMemo } from 'react'
import { isV3Ask } from 'validators/isV3Ask'
import { TypeSafeMarket } from 'validators/market'

import { isAddressMatch, useAuth } from '@shared'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'

export const useRelevantMarket = (markets: TypeSafeMarket[] = []) => {
  const auctions = markets.filter(
    (item) => item?.properties?.__typename === 'V3ReserveAuction'
  )
  const asks = markets.filter((item) => item?.properties?.__typename === 'V3Ask')
  const offers = markets.filter((item) => item?.properties?.__typename === 'V1Offer')

  const ask = asks[0]
  const auction = auctions[0]

  ask?.tokenId === '150' && console.log({ ask })

  const askProperties = ask?.properties
  const { balance: walletBalance, address: userAddress } = useAuth()

  const buyerAddress = useMemo(
    () =>
      isV3Ask(askProperties) && askProperties.buyer ? askProperties.buyer : undefined,
    [askProperties]
  )
  const isPrivateAsk = useMemo(() => buyerAddress || false, [buyerAddress])
  const isActiveAsk = useMemo(() => ask?.status === 'ACTIVE' || false, [ask])
  const hasActivePrivateAsk = useMemo(
    () => isActiveAsk && isPrivateAsk,
    [isActiveAsk, isPrivateAsk]
  )
  const hasActiveV3Ask = useMemo(
    () => isActiveAsk && !isPrivateAsk,
    [isActiveAsk, isPrivateAsk]
  )
  const isCompletedAsk = useMemo(
    () => ask?.status === MARKET_INFO_STATUSES.COMPLETE || false,
    [ask]
  )
  const hasAsk = useMemo(() => askProperties !== undefined, [askProperties])
  const hasRelevantAsk = useMemo(() => hasAsk && isActiveAsk, [hasAsk, isActiveAsk])

  const rawAskAmount = useMemo(() => ask?.price?.nativePrice.raw, [ask])
  const displayAskAmount = useMemo(() => ask?.price?.nativePrice.decimal, [ask])
  const usdAskAmount = ask?.price?.usdcPrice?.decimal
  const hasSufficientFunds = useMemo(
    () => (rawAskAmount ? walletBalance?.value.gte(rawAskAmount) : false),
    [rawAskAmount, walletBalance?.value]
  )
  const isValidPrivateAskBuyer = useMemo(
    () =>
      hasActivePrivateAsk && buyerAddress && isAddressMatch(userAddress, buyerAddress),
    [buyerAddress, hasActivePrivateAsk, userAddress]
  )

  return {
    offers,
    ask,
    auction,
    auctions,
    hasAsk,
    hasRelevantAsk,
    isPrivateAsk,
    isActiveAsk,
    hasActiveV3Ask,
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
