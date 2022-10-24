import { useContext } from 'react'

import { ToastContext, ToastContextType } from './ToastProvider'

export function useToast() {
  const [toastState, toastDispatch] = useContext<ToastContextType>(ToastContext)

  return {
    toastDispatch,
    toastState,
  }
}
