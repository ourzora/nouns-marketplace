import React, { Dispatch, createContext, useCallback, useReducer } from 'react'

import {
  ToastAction,
  ToastProps,
  ToastStatus,
  reducer as toastReducer,
} from '@toast/toastReducer'

import { Toast } from './Toast'
import * as styles from './Toast.css'
import { ToastContainer } from './ToastContainer'

export type ToastType = string | undefined

export type ToastState = {
  toastType?: ToastType
}

export type ToastContextType = [ToastProps, Dispatch<ToastAction>]

export const ToastContext = createContext<ToastContextType>([
  { items: undefined },
  () => null,
] as ToastContextType)

export const ToastContextProvider = ({ children }: { children: JSX.Element }) => {
  const [toastState, toastDispatch] = useReducer(toastReducer, { items: [] })
  const handleCloseToast = useCallback(
    (id: string) => {
      toastDispatch({ type: ToastStatus.REMOVE, id })
    },
    [toastDispatch]
  )

  return (
    <ToastContext.Provider value={[toastState, toastDispatch]}>
      {children}
      <ToastContainer className={styles.container}>
        {!!toastState.items?.length &&
          toastState.items.map((item) => (
            <Toast key={item.id} item={item} onClose={handleCloseToast} />
          ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}
