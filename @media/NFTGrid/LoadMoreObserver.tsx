import { Box, BoxProps } from '@zoralabs/zord'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface LoadMoreObserverProps extends BoxProps {
  handleVisible?: () => void
}

export function LoadMoreObserver({
  handleVisible,
  className,
  ...props
}: LoadMoreObserverProps) {
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && handleVisible) {
      // console.log('load more')
      handleVisible()
    }
  }, [inView, handleVisible])

  return (
    <Box pointerEvents="none" className={className} ref={ref} {...props} aria-hidden />
  )
}
