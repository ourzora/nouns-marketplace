import { Flex } from '@zoralabs/zord'
import { NounsLink } from './NounsLink'
import { CollectionMenu } from '../CollectionMenu'
import { headerWrapper, leftContainer, rightContainer } from './Header.css'
import { ConnectButton } from './ConnectButton'
import { NounsCenterLink } from './NounsCenterLink'

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
