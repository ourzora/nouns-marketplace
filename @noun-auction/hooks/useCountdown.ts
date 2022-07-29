import { useEffect, useState, useMemo } from 'react'
import { intervalToDuration, fromUnixTime, getUnixTime } from 'date-fns'

export const useCountdown = (start: string, end: string) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 500)

    return () => clearInterval(interval)
  })

  const endTime = useMemo(() => {
    /* @ts-ignore */
    return fromUnixTime(end)
  }, [end])

  const countdownText = useMemo(() => {
    if (!start) return ''

    const { hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: endTime,
    })

    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [start, now])

  const isEnded = useMemo(() => {
    // console.log(getUnixTime(now) >= parseInt(end))
    return getUnixTime(now) >= parseInt(end)
  }, [end, now])

  const text = (ready && countdownText) || '...'

  return {
    text,
    isStarted: !isEnded,
    isEnded,
  }
}
