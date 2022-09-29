import { useRef, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

// Hook to determine whether the inner component (childRef) has scrolled in relation to its parent (parentRef)
export function useHasScrolled() {
  const parentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const childRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  useScrollPosition(
    ({ currPos }) => {
      setHasScrolled(currPos.y > 4)
    },
    [],
    childRef,
    false,
    10,
    parentRef
  )

  return {
    hasScrolled,
    parentRef,
    childRef,
  }
}
