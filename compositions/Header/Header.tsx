import * as styles from 'styles/styles.css'

import { Flex, Grid } from '@zoralabs/zord'

import { CollectionMenu } from '../CollectionMenu'
import { ConnectButton } from './ConnectButton'
import * as headerStyles from './Header.css'
import { ManageLink } from './ManageLink'
import { NounsLink } from './NounsLink'

export function Header() {
  return (
    <Flex className={headerStyles.headerWrapper}>
      <Grid
        className={['header-grid', styles.pageGrid]}
        py={{ '@initial': 'x3', '@1024': 'x0' }}
        gap="x2"
      >
        <Flex
          as="header"
          className={[headerStyles.header]}
          justify="space-between"
          px={{ '@initial': 'x4', '@1024': 'x0' }}
        >
          <Flex
            gap={{ '@initial': 'x4', '@1024': 'x8' }}
            align={{ '@initial': 'flex-start', '@1024': 'center' }}
            direction={{ '@initial': 'column', '@1024': 'row' }}
            justify={{ '@initial': 'flex-start', '@1024': 'space-between' }}
          >
            <Flex h={{ '@initial': 'x10', '@1024': 'auto' }}>
              <NounsLink />
            </Flex>
            <CollectionMenu />
          </Flex>

          <Flex
            gap={{ '@initial': 'x4', '@1024': 'x6' }}
            direction={{ '@initial': 'column', '@1024': 'row' }}
            justify={{ '@initial': 'flex-start', '@1024': 'space-between' }}
          >
            <ManageLink />
            <ConnectButton />
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  )
}
