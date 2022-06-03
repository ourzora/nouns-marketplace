import { useCallback } from 'react'
import { Box, Button } from '@zoralabs/zord'
import { Modal, ModalContent, useModal } from '@modal'

/* TODO: Modify Zord ModalContent component to accept custom styling */
export function ModalComposition({
  modalName,
  content,
  trigger,
}: {
  modalName: string
  content?: JSX.Element
  trigger?: JSX.Element
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
