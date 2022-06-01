import { Box, BoxProps } from '@zoralabs/zord'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

/* THIS IS FIRING A LOT */

interface LoadMoreObserverProps extends BoxProps {
  handleVisible?: () => void
}

export function LoadMoreObserver({ handleVisible, ...props }: LoadMoreObserverProps) {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && handleVisible) {
      console.log(inView)
      handleVisible()
    }
  }, [inView])

  return <Box pointerEvents="none" ref={ref} {...props} aria-hidden />
}
