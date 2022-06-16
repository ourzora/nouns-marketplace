import { useMemo, useEffect, useState } from 'react'

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<undefined | number>(undefined)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isLarge = useMemo(() => {
    return windowWidth && windowWidth >= 1024 ? true : false
  }, [windowWidth])

  const isMedium = useMemo(() => {
    return windowWidth && windowWidth >= 576 ? true : false
  }, [windowWidth])

  return {
    isLarge,
    isMedium,
    windowWidth,
  }
}
