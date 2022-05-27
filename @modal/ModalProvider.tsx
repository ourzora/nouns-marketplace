import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
export type ModalType = string | undefined

export type ModalState = {
  modalType?: ModalType
  modalOptions?: Record<any, any>
}

export type ModalContextType = [ModalState, Dispatch<SetStateAction<ModalState>>]

export const ModalContext = createContext<ModalContextType>([
  { modalType: undefined },
  () => null,
] as ModalContextType)

export const ModalContextProvider = ({ children }: { children: JSX.Element }) => {
  const [modalState, setModalState] = useState<ModalState>({
    modalType: undefined,
  })

  return (
    <ModalContext.Provider value={[modalState, setModalState]}>
      {children}
    </ModalContext.Provider>
  )
}
