import React, { useCallback, useState } from 'react'

export enum ModalType {
  NONE = 'NONE',
}

export interface ModalProviderState {
  openModal: (params: ModalParams) => void
  closeModal: () => void
}

type ModalParams = { modalType: ModalType.NONE; props: null }
/*| { modalType: ModalType.CONFIGURE_SALE; props: ConfigureSaleModalProps }*/

export const ModalContext = React.createContext<ModalProviderState>(
  {} as ModalProviderState
)

const ModalProvider: React.FC<{}> = ({ children }) => {
  const [currModalParams, setCurrModalParams] = useState<ModalParams>({
    modalType: ModalType.NONE,
    props: null,
  })

  const openModal = useCallback((p: ModalParams) => {
    setCurrModalParams(p)
  }, [])

  const closeModal = useCallback(() => {
    setCurrModalParams({ modalType: ModalType.NONE, props: null })
  }, [])

  let modalEl
  switch (currModalParams.modalType) {
    /*
    case ModalType.CONFIGURE_SALE:
      modalEl = <ConfigureSaleModal {...currModalParams.props} />
      break
    */
    case ModalType.NONE:
      modalEl = null
      break
    default:
      modalEl = null
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {modalEl}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
