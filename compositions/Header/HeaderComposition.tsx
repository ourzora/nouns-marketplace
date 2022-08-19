import { Grid, Flex } from '@zoralabs/zord'
import { BetaTag } from './BetaTag'
import { NounsLink } from './NounsLink'
import { CollectionMenu } from './CollectionMenu'
import { headerWrapper } from './Header.css'
import { useWindowWidth } from '@shared'
import { ManageLink } from './ManageLink'
import { ConnectButton } from './ConnectButton'

export function HeaderComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Grid as="header" className={headerWrapper}>
      <NounsLink />
      {isLarge && <BetaTag />}
      <CollectionMenu />
      <ManageLink />
      <ConnectButton />
    </Grid>
  )
}
