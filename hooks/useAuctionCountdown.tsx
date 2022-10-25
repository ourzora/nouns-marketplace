import { useEffect, useMemo, useState } from 'react'

import { useCountdown } from '@noun-auction/hooks/useCountdown'

type Props = {
  startTime: string
  endTime: string
}

export const useAuctionCountdown = ({ startTime, endTime }: Props) => {
  const [auctionCompleted, setAuctionCompleted] = useState(false)

  const { text, isEnded } = useCountdown(startTime, endTime)

  useEffect(() => {
    if (isEnded) {
      setAuctionCompleted(true)
    } else {
      setAuctionCompleted(false)
    }
  }, [isEnded, startTime, endTime, setAuctionCompleted])

  return useMemo(
    () => ({
      auctionCompleted,
      text,
    }),
    [auctionCompleted, text]
  )
}
