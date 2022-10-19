import { useCallback, useEffect, useRef } from 'react'

import _ from 'lodash'

export const useThrottle = (cb: CallableFunction, delay: number | undefined) => {
  const options = { leading: true, trailing: false } // add custom lodash options
  const cbRef = useRef(cb)
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => {
    cbRef.current = cb
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  )
}
