import { fromUnixTime, getUnixTime, intervalToDuration } from 'date-fns'

import { useMemo, useState } from 'react'

import { useInterval } from './useInterval'

export const useCountdown = (start?: string, end?: string) => {
  const [now, setNow] = useState(new Date())

  const isEnded = useMemo(() => {
    if (!end) return true

    return getUnixTime(now) >= parseInt(end)
  }, [end, now])

  const countdownText = useMemo(() => {
    if (isEnded || !end) return ''

    const { days, hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: fromUnixTime(parseInt(end)),
    })

    return [days + 'd', hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [isEnded, end, now])

  useInterval(() => setNow(new Date()), 1000)

  return {
    isEnded,
    countdownText,
    now,
  }
}
