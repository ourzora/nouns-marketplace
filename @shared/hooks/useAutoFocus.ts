import { useCallback, useEffect, useRef } from 'react'

export function useAutoFocus(trigger: boolean = false) {
  const inputRef = useRef<HTMLInputElement>(null)

  const setFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setFocus()
  }, [setFocus])

  useEffect(() => {
    if (trigger) {
      setFocus()
    }
  }, [setFocus, trigger])

  return inputRef
}
