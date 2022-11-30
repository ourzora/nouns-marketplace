import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { isAddressMatch, numberFormatterUSDC, roundTwoDecimals } from '@shared'
import { useAuth } from '@shared/hooks'
import { FixedPriceLike, MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types'

interface NounishAuctionHelperProps {
  auction: TypeSafeNounsAuction
}

export const useNounishAuctionHelper = ({ auction }: NounishAuctionHelperProps) => {
  const { endTime, highestBidPrice, highestBidder, winner } = auction

  const { isEnded } = useIsAuctionCompleted({
    activeAuction: auction,
  })

  // const highBidAddress = useMemo(() => isEnded ? highestBidder: undefined,[highestBidder, isEnded])
  const winnerAddress = useMemo(() => winner ?? winner, [winner])
  // const highBidAddress = useMemo(() => winner ?? winner,[winner])
  const hasWinner = !!winnerAddress
  const hasBid = !!highestBidder

  // const { balance: walletBalance, address: userAddress } = useAuth()
  // const buyerAddress = useMemo(() => ask?.raw?.properties?.buyer, [ask])
  // const isPrivateAsk = useMemo(() => buyerAddress || false, [buyerAddress])
  // const isActiveAsk = useMemo(
  //   () => ask?.status === MARKET_INFO_STATUSES.ACTIVE || false,
  //   [ask]
  // )
  // const hasActivePrivateAsk = useMemo(
  //   () => isActiveAsk && isPrivateAsk,
  //   [isActiveAsk, isPrivateAsk]
  // )
  // const isCompletedAsk = useMemo(
  //   () => ask?.status === MARKET_INFO_STATUSES.COMPLETE || false,
  //   [ask]
  // )
  // const hasAsk = useMemo(() => ask !== undefined, [ask])
  // const hasRelevantAsk = useMemo(() => hasAsk && isActiveAsk, [hasAsk, isActiveAsk])

  // const rawAskAmount = useMemo(() => ask?.amount?.amount.raw.toString(), [ask])
  // const displayAskAmount = useMemo(() => ask?.amount?.amount.value.toString(), [ask])
  // const usdAskAmount = useMemo(
  //   () =>
  //     ask?.amount?.usd?.value
  //       ? numberFormatterUSDC(roundTwoDecimals(ask.amount.usd.value))
  //       : '...',
  //   [ask]
  // )
  // const hasSufficientFunds = useMemo(
  //   () => (rawAskAmount ? walletBalance?.value.gte(rawAskAmount) : false),
  //   [rawAskAmount, walletBalance?.value]
  // )
  // const isValidPrivateAskBuyer = useMemo(
  //   () => hasActivePrivateAsk && isAddressMatch(userAddress, buyerAddress),
  //   [buyerAddress, hasActivePrivateAsk, userAddress]
  // )

  return {
    isEnded,
    endTime,
    hasBid,
    highestBidPrice,
    hasWinner,
    winnerAddress,
  }
}
