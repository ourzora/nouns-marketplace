import { useCallback } from 'react'
import { Box, Button } from '@zoralabs/zord'
import { Modal, ModalContent, useModal } from '@modal'

export type ModalCompositionProps = {
  /** Unique identifier / key for the modal */
  modalName: string
  /** Content housed inside of modal */
  content: JSX.Element
  /** Contents that will be wrapped by an unstyled button element to open the modal */
  trigger: JSX.Element
}

/* TODO: Modify Zord ModalContent component to accept custom styling */
export function ModalComposition({
  modalName,
  content,
  trigger,
}: {
  /** Unique identifier / key for the modal */
  modalName: string
  /** Content housed inside of modal */
  content: JSX.Element
  /** Contents that will be wrapped by an unstyled button element to open the modal */
  trigger: JSX.Element
}) {
  const { modalType, requestClose, requestOpen } = useModal()

  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [])

  return (
    <>
      <Box>
        <Button variant="unset" onClick={modalHandler}>
          {trigger}
        </Button>
      </Box>
      <Modal open={modalType === modalName} onOpenChange={requestClose}>
        <ModalContent title="modal" showClose={false} removePadding>
          {content}
        </ModalContent>
      </Modal>
    </>
  )
}
