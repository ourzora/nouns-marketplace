import { Flex } from '@zoralabs/zord'

import { CollectionMenu } from '../CollectionMenu'
import { ConnectButton } from './ConnectButton'
import { headerWrapper, leftContainer, rightContainer } from './Header.css'
import { NounsCenterLink } from './NounsCenterLink'
import { NounsLink } from './NounsLink'

export function HeaderComposition() {
  return (
    <Flex as="header" className={headerWrapper}>
      <Flex className={leftContainer}>
        <NounsLink />
        <CollectionMenu />
      </Flex>

      <Flex className={rightContainer}>
        <NounsCenterLink />
        <ConnectButton />
      </Flex>
    </Flex>
  )
}
