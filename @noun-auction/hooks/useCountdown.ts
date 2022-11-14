import { fromUnixTime, getUnixTime, intervalToDuration } from 'date-fns'

import { useEffect, useMemo, useState } from 'react'

export const useCountdown = (start?: string, end?: string) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  })

  const isEnded = useMemo(() => {
    if (!end) return true

    return getUnixTime(now) >= parseInt(end)
  }, [end, now])

  return {
    isEnded,
    now,
  }
}
