import { Flex } from '@zoralabs/zord'
import { DocsLink } from './DocsLink'
import { NounsLink } from './NounsLink'
import { CollectionMenu } from '../CollectionMenu'
import { headerWrapper } from './Header.css'
import { useWindowWidth } from '@shared/hooks'
import { ManageLink } from './ManageLink'
import { ConnectButton } from './ConnectButton'

export function HeaderComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex as="header" className={headerWrapper} justify="space-between">
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
  )
}
