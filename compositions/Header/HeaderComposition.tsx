import { useWindowWidth } from '@shared'
import { Grid } from '@zoralabs/zord'

import { CollectionMenu } from '../CollectionMenu'
import { ConnectButton } from './ConnectButton'
import { DocsLink } from './DocsLink'
import { headerWrapper } from './Header.css'
import { ManageLink } from './ManageLink'
import { NounsLink } from './NounsLink'

export function HeaderComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Grid as="header" className={headerWrapper}>
      <NounsLink />
      {isLarge && <DocsLink />}
      <CollectionMenu />
      <ManageLink />
      <ConnectButton />
    </Grid>
  )
}
