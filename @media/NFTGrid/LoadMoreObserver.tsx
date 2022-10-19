import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Box, BoxProps } from '@zoralabs/zord'

interface LoadMoreObserverProps extends BoxProps {
  handleVisible?: () => void
}

export function LoadMoreObserver({
  handleVisible,
  className,
  ...props
}: LoadMoreObserverProps) {
  const [ref, inView] = useInView({
    threshold: 0.25,
    rootMargin: '0px 0px 500px 0px',
  })

  useEffect(() => {
    if (inView && handleVisible) {
      handleVisible()
    }
  }, [inView, handleVisible])

  return (
    <Box pointerEvents="none" className={className} ref={ref} {...props} aria-hidden />
  )
}
