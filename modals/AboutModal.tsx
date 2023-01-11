import * as styles from 'compositions/Header/Header.css'
import Link from 'next/link'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { Button, Heading, Label, Paragraph, Stack } from '@zord'

export function AboutModal() {
  const { requestClose } = useModal()

  return (
    <Modal
      onOpenChange={requestClose}
      trigger={
        <Button
          variant="unset"
          px={{ '@initial': 'x0', '@1024': 'x4' }}
          w="100%"
          h="100%"
          justify={{ '@initial': 'flex-start', '@1024': 'center' }}
        >
          <Label
            size="lg"
            px={{ '@initial': 'x0', '@1024': 'x4' }}
            w="100%"
            h="100%"
            className={styles.linksMenuItem}
          >
            About
          </Label>
        </Button>
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
          <Stack gap="x2">
            <Paragraph size="sm">
              <Link href="https://noun.market">The Nouns Marketplace</Link> is the
              marketplace for original Nouns and extension projects, powered by ZORA. The
              app is open-source. Clone it by checking out our open-source{' '}
              <Link href="https://github.com/ourzora/nouns-marketplace">GitHub repo</Link>
              . You may also find these developer docs useful.
            </Paragraph>
            <Paragraph size="sm">
              For feedback and ideas, feel free to tag or DM us{' '}
              <Link href="https://twitter.com/nounmarket">on Twitter</Link> ⌐◨-◨
            </Paragraph>
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  )
}
