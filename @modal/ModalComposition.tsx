import { useCallback } from 'react'
import { Box, Button } from '@zoralabs/zord/elements'
import { Modal, ModalContent, useModalRegistry } from '@modal'

export function ModalComposition({
  modalName,
  content,
  modalTrigger,
}: {
  modalName: string
  content?: JSX.Element
  modalTrigger?: JSX.Element
}) {
  const { modalType, requestClose, requestOpen } = useModalRegistry()

  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [])

  return (
    <>
      <Box>
        <Button variant="unset" onClick={modalHandler}>
          {modalTrigger}
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
