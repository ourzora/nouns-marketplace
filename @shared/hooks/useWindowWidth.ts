import { useEffect, useMemo, useState } from 'react'

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<undefined | number>(undefined)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isLarge: boolean = useMemo(() => {
    return !!(windowWidth && windowWidth >= 1024)
  }, [windowWidth])

  const isMedium: boolean = useMemo(() => {
    return !!(windowWidth && windowWidth >= 576 && windowWidth < 1024)
  }, [windowWidth])

  const isSmall: boolean = useMemo(() => {
    return !!(windowWidth && windowWidth < 576)
  }, [windowWidth])

  return {
    isLarge,
    isMedium,
    isSmall,
    windowWidth,
  }
}
