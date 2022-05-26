import { Box, Button, Stack } from '@zoralabs/zord/elements'
import { ModalRegistry, Modal, ModalContent, useModalRegistry } from '@modal'

export function TestModal() {
  const { modalType, requestClose, requestOpen } = useModalRegistry()

  return (
    <>
      <Box>
        <Button
          variant="primary"
          borderRadius="round"
          size="sm"
          onClick={() => requestOpen(ModalRegistry.TEST_MODAL)}
        >
          OPEN
        </Button>
      </Box>
      <Modal open={modalType === ModalRegistry.TEST_MODAL} onOpenChange={requestClose}>
        <ModalContent title="modal" showClose={false} removePadding>
          <Stack>MODAL</Stack>
        </ModalContent>
      </Modal>
    </>
  )
}
