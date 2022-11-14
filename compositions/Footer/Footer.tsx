import { useWindowWidth } from '@shared/hooks'
import { PoweredByZora } from '@zora-brand'
import { Box, Flex, Label } from '@zoralabs/zord'

import * as styles from './Footer.css'

export function Footer() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex as="footer" className={styles.footerWrap}>
      <Flex className={styles.footer}>
        <Box gap="x2" className={styles.menu}>
          <Label px="x4" as="a" size="lg" href="/docs" passhref="/docs">
            Docs
          </Label>
          <Label px="x4" as="a" size="lg" href="#">
            About
          </Label>
        </Box>

        <Box className={[styles.poweredBy]}>
          <PoweredByZora size={isLarge ? 48 : 32} />
        </Box>

        <Box className={styles.menu}>
          <Label
            px="x4"
            size="lg"
            rel="noreferrer"
            as="a"
            href="https://github.com/ourzora/nouns-marketplace"
            target="_blank"
          >
            GitHub
          </Label>
          <Label
            px="x4"
            as="a"
            href="https://twitter.com/nounmarket"
            target="_blank"
            size="lg"
            rel="noreferrer"
          >
            Twitter
          </Label>
        </Box>
      </Flex>
    </Flex>
  )
}
