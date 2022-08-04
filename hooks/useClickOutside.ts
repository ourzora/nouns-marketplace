import { useEffect } from 'react'
import { isClientSide } from 'utils/window'

/**
 * Detect clicks outside of the specified element or those having specified selectors, and apply a function when triggered.
 * @param {Object} ref Ref of core element to which the click outside applies
 * @param {Function} handler Function to be called when triggered.
 * @param {String} ignoreClasses DOMString containing a selector list to ignore eg. "p:hover, .toto + q". Especially helpful for React modals found outside the document flow.
 */

const useClickOutside = (ref: any, handler: Function, ignoreClasses?: string) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        ref?.current &&
        !ref?.current.contains(event.target) &&
        (ignoreClasses === undefined ||
          (ignoreClasses && (event.target as Element)?.closest(ignoreClasses) === null))
      ) {
        handler(event)
      }
    }
    if (isClientSide) {
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
    }

    return () => {
      if (isClientSide) {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }
  }, [ref, handler, ignoreClasses])
}

export { useClickOutside }
