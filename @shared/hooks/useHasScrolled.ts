import { SyntheticEvent, useState } from 'react'

import { useThrottle } from './useThrottle'

export function useHasScrolled() {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  useThrottle(scrollEvent, 50)

  function scrollEvent(e: SyntheticEvent) {
    const target = e.target as HTMLDivElement
    setHasScrolled(target.scrollTop > 4)
  }

  return {
    hasScrolled,
    scrollEvent,
  }
}
