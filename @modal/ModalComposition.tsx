import { useCallback } from 'react'
import { Box, Button } from '@zoralabs/zord'
import { Modal, ModalContent, useModalRegistry } from '@modal'

export function ModalComposition({
  modalName,
  content,
  trigger,
}: {
  modalName: string
  content?: JSX.Element
  trigger?: JSX.Element
}) {
  const { modalType, requestClose, requestOpen } = useModalRegistry()

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
