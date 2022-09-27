import { ToastContext, ToastContextType } from './ToastProvider'
import { useContext } from 'react'

export function useToast() {
  const [toastState, toastDispatch] = useContext<ToastContextType>(ToastContext)

  return {
    toastDispatch,
    toastState,
  }
}
