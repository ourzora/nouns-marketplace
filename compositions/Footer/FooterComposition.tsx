import { Label, Box, Flex } from '@zoralabs/zord'
import { PoweredByZora } from '@zora-brand'
import * as styles from './Footer.css'
import { useWindowWidth } from '@shared/hooks'

export function FooterComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex className={styles.footerWrap}>
      <Flex as="footer" className={styles.footerWrapper}>
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
