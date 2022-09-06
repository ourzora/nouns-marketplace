import { Grid } from '@zoralabs/zord'
import { NounsLink } from './NounsLink'
import { CollectionMenu } from '../CollectionMenu'
import { headerWrapper } from './Header.css'
import { useWindowWidth } from '@shared'
import { ConnectButton } from './ConnectButton'
import { NounsCenterLink } from './NounsCenterLink'

export function HeaderComposition() {
  return (
    <Grid as="header" className={headerWrapper}>
      <NounsLink />
      <CollectionMenu />
      <NounsCenterLink />
      <ConnectButton />
    </Grid>
  )
}
