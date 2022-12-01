import { PoweredByZora } from '@zora-brand'
import { Flex, Label } from '@zord'

import * as styles from './Footer.css'

export function Footer() {
  return (
    <Flex as="footer" className={styles.footerWrap}>
      <Flex className={styles.footer}>
        <Flex gap="x6">
          <Label as="a" size="lg" href="/docs">
            Docs
          </Label>
          <Label as="a" size="lg" href="#">
            About
          </Label>
        </Flex>

        <PoweredByZora size={32} className={styles.poweredBy} />

        <Flex gap="x8">
          <Label
            size="lg"
            rel="noreferrer"
            as="a"
            href="https://github.com/ourzora/nouns-marketplace"
            target="_blank"
          >
            GitHub
          </Label>
          <Label
            as="a"
            href="https://twitter.com/nounmarket"
            target="_blank"
            size="lg"
            rel="noreferrer"
          >
            Twitter
          </Label>
        </Flex>
      </Flex>
    </Flex>
  )
}
