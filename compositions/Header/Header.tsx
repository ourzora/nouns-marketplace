import { useWindowWidth } from '@shared'
import { Flex } from '@zoralabs/zord'

import { CollectionMenu } from '../CollectionMenu'
import { ConnectButton } from './ConnectButton'
import { DocsLink } from './DocsLink'
import * as styles from './Header.css'
import { ManageLink } from './ManageLink'
import { NounsLink } from './NounsLink'

export function Header() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex className={styles.headerWrapper}>
      <Flex as="header" className={styles.header} justify="space-between">
        <Flex
          gap={{ '@initial': 'x2', '@1024': 'x8' }}
          align={{ '@initial': 'flex-start', '@1024': 'center' }}
          direction={{ '@initial': 'column', '@1024': 'row' }}
          justify="space-between"
        >
          <NounsLink />
          <Flex>
            <CollectionMenu />
          </Flex>
        </Flex>

        <Flex
          gap={{ '@initial': 'x2', '@1024': 'x6' }}
          direction={{ '@initial': 'column', '@1024': 'row' }}
          justify="space-between"
        >
          {isLarge && <DocsLink />}
          <ManageLink />
          <ConnectButton />
        </Flex>
      </Flex>
    </Flex>
  )
}
