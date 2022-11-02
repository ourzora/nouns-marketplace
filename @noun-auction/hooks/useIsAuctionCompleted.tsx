import { fromUnixTime, intervalToDuration } from 'date-fns'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useCountdown } from './useCountdown'
import { useNounishAuctionQuery } from './useNounishAuctionQueries'

// memoized version, because useCountdown is updated every tick causing re-renders
export const useIsAuctionCompleted = ({
  activeAuction,
}: {
  activeAuction: TypeSafeNounsAuction
}) => {
  const { isEnded, now } = useCountdown(activeAuction?.startTime, activeAuction?.endTime)

  const countdownText = useMemo(() => {
    if (isEnded || !activeAuction?.startTime || !activeAuction?.endTime) return ''

    const { hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: fromUnixTime(parseInt(activeAuction?.endTime || '0')),
    })

    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [isEnded, activeAuction?.startTime, now, activeAuction?.endTime])

  const result = useMemo(() => {
    return {
      isEnded,
      countdownText,
    }
  }, [isEnded, countdownText])

  return result
}
