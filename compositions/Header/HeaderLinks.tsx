import { AboutModal } from 'modals/AboutModal'

import { useWindowWidth } from '@shared'
import { Box, Flex, Label, PopUp } from '@zord'

import * as styles from './Header.css'

function Links() {
  return (
    <Flex
      as="ul"
      direction={{ '@initial': 'column', '@1024': 'row' }}
      gap={{ '@initial': 'x0', '@1024': 'x4' }}
      p={{ '@initial': 'x2', '@1024': 'x0' }}
      className={[styles.popupContent]}
    >
      <Box as="li">
        <Label
          as="a"
          href="https://nouns.center/"
          px={{ '@initial': 'x0', '@1024': 'x4' }}
          w="100%"
          h="100%"
          className={styles.linksMenuItem}
          size="lg"
        >
          Nouns Center
        </Label>
      </Box>
      <Box as="li">
        <AboutModal />
      </Box>
    </Flex>
  )
}

function MobileLinks() {
  return (
    <PopUp padding="x0" placement="bottom-end" triggerClassName={styles.popupTrigger}>
      <Links />
    </PopUp>
  )
}

export function HeaderLinks() {
  const { isLarge } = useWindowWidth()

  return isLarge ? <Links /> : <MobileLinks />
}
