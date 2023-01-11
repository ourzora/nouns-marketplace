import * as siteStyles from 'styles/styles.css'

import { useNounishAuctionQuery } from '@noun-auction'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Grid, GridProps, Stack } from '@zord'

import * as styles from './CollectionHeader.css'
import { CollectionHero } from './CollectionHero'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
}

export function CollectionHeader({
  collection,
  children,
  currentAuction,
  className,
  ...props
}: CollectionHeaderProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: collection.address,
  })

  return (
    <Grid
      className={[siteStyles.pageGrid]}
      px={{ '@initial': 'x0', '@1024': 'x4' }}
      alignSelf="center"
    >
      <Stack
        w="100%"
        className={[styles.collectionGrid, className]}
        display="grid"
        mt={{ '@initial': 'x6', '@1024': 'x8' }}
        px={{
          '@initial': 'x4',
          '@1024': 'x0',
        }}
      >
        {activeAuction && <CollectionHero activeAuction={activeAuction} />}
      </Stack>
    </Grid>
  )
}
