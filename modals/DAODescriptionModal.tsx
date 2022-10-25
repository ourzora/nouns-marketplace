import { InfoIcon } from 'components/Icon/InfoIcon'
import { mediumFont } from 'styles/styles.css'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'

export function DAODescriptionModal() {
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
          <Heading as="h2">What are DAOs?</Heading>
          <Stack gap="x4">
            <Paragraph size="sm" className={mediumFont}>
              Nouns styled DAOs are interesting for 3 main reasons:
            </Paragraph>
            <Stack as="ul" gap="x2">
              <Paragraph as="li" size="sm" className={mediumFont}>
                <strong>Distribution Mechanism:</strong> Creating an NFT at a consistent
                interval allows the community to form at a healthy rate rather than
                distributing governance via a mass airdrop
              </Paragraph>
              <Paragraph as="li" size="sm" className={mediumFont}>
                <strong>Composable and Upgradable:</strong> All contracts are individually
                upgradable meaning the DAO is not a static thing, but rather something
                that is meant to evolve over time
              </Paragraph>
              <Paragraph as="li" size="sm" className={mediumFont}>
                <strong>Perpetual Funding:</strong> The DAO creates sustainable funding by
                consistently issuing new NFTs over time
              </Paragraph>
            </Stack>
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  )
}
