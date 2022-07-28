import { Grid, Flex } from '@zoralabs/zord'
import { BetaTag } from './BetaTag'
import { NounsLink } from './NounsLink'
import { CollectionMenu } from './CollectionMenu'
import {
  collectionTriggerWrapper,
  connectWrapper,
  headerWrapper,
  manageButtonWrapper,
} from './Header.css'
import { useWindowWidth } from 'hooks'
import { ManageLink } from './ManageLink'
import { ConnectButton } from './ConnectButton'

export function HeaderComposition() {
  const { isLarge } = useWindowWidth()
  return (
    <Grid as="header" className={headerWrapper}>
      <NounsLink />
      {isLarge && <BetaTag />}
      <Flex className={collectionTriggerWrapper}>
        <CollectionMenu />
      </Flex>
      <Flex className={manageButtonWrapper}>
        <ManageLink />
      </Flex>
      <Flex className={connectWrapper}>
        <ConnectButton />
      </Flex>
    </Grid>
  )
}
