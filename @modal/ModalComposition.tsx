import { ClassValue } from 'clsx'

import { useCallback, useMemo } from 'react'

import { Modal, ModalContent, useModal } from '@modal'
import { useButtonRequiresAuth } from '@shared'
import { Box, BoxProps } from '@zoralabs/zord'

import { customBackground, customContent } from './Modal.css'

export interface ModalCompositionProps extends BoxProps {
  /** Unique identifier / key for the modal */
  modalName: string
  /** Content housed inside of modal */
  content: JSX.Element
  /** Contents that will be wrapped by an unstyled button element to open the modal */
  trigger: JSX.Element
  /** Default is lightTheme */
  modalTheme?: ClassValue | undefined
  /** Modal background css overrides: vanilla extract style object */
  modalBackgroundOverrides?: any
  /** Modal content css overrides: vanilla extract style object */
  modalContentOverrides?: any
  /** Modal overlay css overrides: vanilla extract style object */
  modalOverlayOverrides?: any
  /** Disallow clicking outside of container to close modal */
  disableCloseOnClickOutside?: boolean
  /** Optionally trigger RainbowWallet connect prompt if modal behavior requires auth  */
  modalBehaviorRequiresAuth?: boolean
}

/* TODO: Modify Zord ModalContent component to accept custom styling */
export function ModalComposition({
  modalName,
  content,
  trigger,
  className,
  modalContentOverrides = customContent,
  modalBackgroundOverrides = customBackground,
  disableCloseOnClickOutside = false,
  modalOverlayOverrides,
  modalBehaviorRequiresAuth = false,
}: ModalCompositionProps) {
  const { modalType, requestClose, requestOpen } = useModal()

  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [modalName, requestOpen])

  const variableButtonBehavior = useButtonRequiresAuth(modalHandler)
  const buttonAction = useMemo(
    () => (modalBehaviorRequiresAuth ? variableButtonBehavior : modalHandler),
    [variableButtonBehavior, modalBehaviorRequiresAuth, modalHandler]
  )

  return (
    <>
      <Box className={['zora-modal-trigger-wrapper', className]} onClick={buttonAction}>
        <Box className="zora-modal-trigger" display="block">
          {trigger}
        </Box>
      </Box>
      <Modal
        open={modalType === modalName}
        onOpenChange={requestClose}
        modalOverlayOverrides={modalOverlayOverrides}
      >
        <ModalContent
          title="modal"
          showClose={false}
          padding="x0"
          modalContentOverrides={modalContentOverrides}
          modalBackgroundOverrides={modalBackgroundOverrides}
          disableCloseOnClickOutside={disableCloseOnClickOutside}
        >
          {content}
        </ModalContent>
      </Modal>
    </>
  )
}
