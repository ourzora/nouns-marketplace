import { useMemo } from 'react'

import { useCountdown } from './useCountdown'
import { useNounishAuctionQuery } from './useNounishAuctionQueries'

// memoized version, because useCountdown is updated every tick causing re-renders
export const useIsAuctionCompleted = ({
  collectionAddress,
}: {
  collectionAddress: string
}) => {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  const { isEnded } = useCountdown(activeAuction?.startTime, activeAuction?.endTime)

  //FIXME isEnded never memoized
  return useMemo(() => isEnded, [isEnded])
}
