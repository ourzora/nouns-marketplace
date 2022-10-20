import { isClientSide } from 'utils/window'

import { useCallback, useEffect } from 'react'

export const useKeyPress = (
  keyPressed: string,
  runCondition: boolean,
  fn: Function | (() => void)
) => {
  const upHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === keyPressed && isClientSide && runCondition) {
        fn()
      }
    },
    [fn, keyPressed, runCondition]
  )

  useEffect(() => {
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, [upHandler])
}
