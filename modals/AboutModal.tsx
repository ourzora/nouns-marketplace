import { Button } from 'components/Button'
import { InfoIcon } from 'components/Icon/InfoIcon'
import { manageButton } from 'compositions/Header/Header.css'
import Link from 'next/link'
import { mediumFont } from 'styles/styles.css'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { Heading, Label, Paragraph, Stack } from '@zoralabs/zord'

export function AboutModal() {
  const { requestClose } = useModal()

  return (
    <Modal
      onOpenChange={requestClose}
      trigger={
        <Label px="x4" size="lg">
          About
        </Label>
      }
    >
      <ModalContent
        modalContentOverrides={customContent}
        modalBackgroundOverrides={customBackground}
        showClose={true}
        padding="x8"
      >
        <Stack gap="x8">
          <Heading as="h2">About Nouns Marketplace</Heading>
          {/* <Stack gap="x4"> */}
          <Stack gap="x2">
            <Paragraph size="md" className={mediumFont}>
              {/* <strong>Distribution Mechanism:</strong> Creating an NFT at a consistent
                interval allows the community to form at a healthy rate rather than
                distributing governance via a mass airdrop */}
              <Link href="https://noun.market">The Nouns Marketplace</Link> is the
              marketplace for original Nouns and extension projects, powered by ZORA. The
              app is open-source. Clone it by checking out our open-source GitHub repo.
              You may also find these developer docs useful.
            </Paragraph>
            <Paragraph size="md" className={mediumFont}>
              For feedback and ideas, feel free to tag or DM us{' '}
              <Link href="https://twitter.com/nounmarket">on Twitter</Link> ⌐◨-◨
              {/* <strong>Composable and Upgradable:</strong> All contracts are individually
                upgradable meaning the DAO is not a static thing, but rather something
                that is meant to evolve over time */}
            </Paragraph>
          </Stack>
          {/* </Stack> */}
        </Stack>
      </ModalContent>
    </Modal>
  )
}
