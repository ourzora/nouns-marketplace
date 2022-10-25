import { InfoIcon } from 'components/Icon/InfoIcon'
import { mediumFont } from 'styles/styles.css'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'

export function CollectionDescriptionModal() {
  const { requestClose } = useModal()
  return (
    <Modal onOpenChange={requestClose} trigger={<InfoIcon />}>
      <ModalContent
        modalContentOverrides={customContent}
        modalBackgroundOverrides={customBackground}
        showClose={true}
        padding="x8"
      >
        <Stack gap="x8">
          <Heading as="h2">What are Collections?</Heading>
          <Stack gap="x4">
            <Paragraph size="sm" className={mediumFont}>
              Collections differ from DAOs in the following ways:
            </Paragraph>
            <Stack as="ul" gap="x2">
              <Paragraph as="li" size="sm" className={mediumFont}>
                <strong>No Treasury:</strong> Collections don&apos;t have a treasury to
                fund organizational initiatives
              </Paragraph>
              <Paragraph as="li" size="sm" className={mediumFont}>
                <strong>No Voting Mechanism:</strong> NFT owners don&apos;t have the
                ability to vote on the use of treasury funds
              </Paragraph>
            </Stack>
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  )
}
