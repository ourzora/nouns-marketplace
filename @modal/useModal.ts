import { ModalContext, ModalContextType, ModalType } from './ModalProvider'
import { useCallback, useContext } from 'react'

export function useModal() {
  const [state, setState] = useContext<ModalContextType>(ModalContext)
  const { modalType, modalOptions = {} } = state

  const handleSetModalOptions = useCallback(
    (update: any) => {
      setState((prev) => ({ ...prev, options: { ...prev?.modalOptions, ...update } }))
    },
    [setState]
  )

  const requestClose = useCallback(async () => {
    setState({ modalType: undefined, modalOptions: {} })
  }, [setState])

  const requestOpen = useCallback(
    async (nextModalType: ModalType, options?: { [key: string]: any }) => {
      if (nextModalType === modalType) {
        return
      }
      return setState({
        modalType: nextModalType,
        ...(options && { modalOptions: options }),
      })
    },
    [modalType, setState]
  )

  const setModalType = useCallback(
    (modalType: ModalType) => setState({ modalType }),
    [setState]
  )

  return {
    modalType,
    setModalType,
    modalOptions,
    setModalOptions: handleSetModalOptions,
    requestClose,
    requestOpen,
  }
}
