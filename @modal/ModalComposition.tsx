import { useCallback, useMemo } from 'react'
import { ClassValue } from 'clsx'
import { Box, Button } from '@zoralabs/zord'
import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from './Modal.css'
import { useAuth } from '@shared'

export type ModalCompositionProps = {
  /** Unique identifier / key for the modal */
  modalName: string
  /** Content housed inside of modal */
  content: JSX.Element
  /** Contents that will be wrapped by an unstyled button element to open the modal */
  trigger: JSX.Element
  /** Default is lightTheme */
  modalTheme?: ClassValue | undefined
  /** Modal background css overrides: vannila extract style object */
  modalBackgroundOverrides?: any
  /** Modal content css overrides: vannila extract style object */
  modalContentOverrides?: any
  /** Modal overlay css overrides: vannila extract style object */
  modalOverlayOverrides?: any
  onClickOverrideWhenUnconnected?: () => void
}

/* TODO: Modify Zord ModalContent component to accept custom styling */
export function ModalComposition({
  modalName,
  content,
  trigger,
  modalContentOverrides = customContent,
  modalBackgroundOverrides = customBackground,
  modalOverlayOverrides,
  onClickOverrideWhenUnconnected,
}: ModalCompositionProps) {
  const { modalType, requestClose, requestOpen } = useModal()
  const { address } = useAuth()

  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [modalName, requestOpen])
  const triggerBehavior = useMemo(
    () =>
      !address && onClickOverrideWhenUnconnected
        ? onClickOverrideWhenUnconnected
        : modalHandler,
    [address, modalHandler, onClickOverrideWhenUnconnected]
  )
  return (
    <>
      <Box className="zora-modal-trigger-wrapper">
        <Button
          variant="unset"
          onClick={triggerBehavior}
          className="zora-modal-trigger"
          display="block"
        >
          {trigger}
        </Button>
      </Box>
      <Modal
        open={modalType === modalName}
        onOpenChange={requestClose}
        modalOverlayOverrides={modalOverlayOverrides}
      >
        <ModalContent
          title="modal"
          showClose={false}
          removePadding
          modalContentOverrides={modalContentOverrides}
          modalBackgroundOverrides={modalBackgroundOverrides}
        >
          {content}
        </ModalContent>
      </Modal>
    </>
  )
}
