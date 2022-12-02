import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { formatCryptoVal, isAddressMatch, numberFormatterUSDC } from '@shared'
import { useAuth } from '@shared/hooks'

interface NounishAuctionHelperProps {
  auction: TypeSafeNounsAuction
}

export const useNounishAuctionHelper = ({ auction }: NounishAuctionHelperProps) => {
  const { address: userAddress } = useAuth()

  const { endTime, highestBidPrice, highestBidder, winner, startTime } = auction

  const { isEnded } = useIsAuctionCompleted({
    activeAuction: auction,
  })

  const hasWinner = !!winner
  const hasBid = !!highestBidder
  const auctionStatus = useMemo(
    () => (Date.now() - parseInt(endTime) * 1000 > 0 ? 'Settling' : 'Live'),
    [endTime]
  )

  const formattedCryptoHighestBidPrice = useMemo(
    () =>
      highestBidPrice?.nativePrice.raw
        ? formatCryptoVal(parseFloat(highestBidPrice?.nativePrice.raw))
        : '...',
    [highestBidPrice?.nativePrice.raw]
  )
  const formattedUSDHighestBidPrice = useMemo(
    () =>
      highestBidPrice?.usdcPrice?.decimal
        ? numberFormatterUSDC(highestBidPrice?.usdcPrice?.decimal)
        : '...',
    [highestBidPrice?.usdcPrice?.decimal]
  )
  const isClaimable = useMemo(
    // User is winner, can claim NFT
    () => isEnded && hasWinner && isAddressMatch(userAddress, winner),
    [isEnded, hasWinner, userAddress, winner]
  )

  return {
    isEnded,
    isClaimable,
    endTime,
    hasBid,
    highestBidPrice,
    hasWinner,
    winnerAddress: winner,
    auctionStatus,
    highestBidder,
    formattedCryptoHighestBidPrice,
    formattedUSDHighestBidPrice,
  }
}
