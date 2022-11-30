import { fromUnixTime, getUnixTime, intervalToDuration } from 'date-fns'

import { useEffect, useMemo, useState } from 'react'

export const useCountdown = (start?: string, end?: string) => {
  const [now, setNow] = useState(new Date())

  console.log('CURRENT AUCTION END: ', end)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  })

  const isEnded = useMemo(() => {
    if (!end) return true

    console.log('UNIXTIME NOW', getUnixTime(now))
    console.log('PARSEINT END', parseInt(end))

    // YIKES: NOUNISH_AUCTIONS_QUERY is not updated to new token ~1hr after prev auction finished, when nouns.wtf already reflects new auction at 23h 11m 50s

    return getUnixTime(now) >= parseInt(end)
  }, [end, now])

  console.log('ENDED IN useCountdown?', isEnded)

  return {
    isEnded,
    now,
  }
}
