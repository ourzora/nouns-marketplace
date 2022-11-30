import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useCountdown } from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import {
  formatCryptoVal,
  isAddressMatch,
  numberFormatterUSDC,
  roundTwoDecimals,
} from '@shared'
import { useAuth } from '@shared/hooks'
import { FixedPriceLike, MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types'

interface NounishAuctionHelperProps {
  auction: TypeSafeNounsAuction
}

export const useNounishAuctionHelper = ({ auction }: NounishAuctionHelperProps) => {
  const { endTime, highestBidPrice, highestBidder, winner, startTime } = auction

  const { isEnded } = useIsAuctionCompleted({
    activeAuction: auction,
  })

  const winnerAddress = useMemo(() => winner ?? winner, [winner])
  const hasWinner = !!winnerAddress
  const hasBid = !!highestBidder

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

  return {
    isEnded,
    endTime,
    hasBid,
    highestBidPrice,
    hasWinner,
    winnerAddress,
    highestBidder,
    formattedCryptoHighestBidPrice,
    formattedUSDHighestBidPrice,
  }
}
