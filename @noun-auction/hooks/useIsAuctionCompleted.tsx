import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useCountdown } from './useCountdown'

// memoized version, because useCountdown is updated every tick causing re-renders
export const useIsAuctionCompleted = ({
  activeAuction,
}: {
  activeAuction: TypeSafeNounsAuction
}) => {
  const { isEnded } = useCountdown(activeAuction?.startTime, activeAuction?.endTime)
  const result = useMemo(() => {
    return {
      isEnded,
    }
  }, [isEnded])

  return result
}
