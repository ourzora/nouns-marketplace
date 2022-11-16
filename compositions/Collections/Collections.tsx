import { useEffect } from 'react'

import { useCollectionFilters } from '@filter'
import { useOneNounsDao } from '@noun-auction'
import { Stack } from '@zoralabs/zord'

import { CollectionGrid } from './CollectionGrid'
import * as styles from './Collections.css'
import { DaoGrid } from './DaoGrid'

export type CollectionsProps = {
  collectionAddress: string
  view?: 'activity' | 'nfts' | string
}

export function Collections({ view = 'nfts', collectionAddress }: CollectionsProps) {
  const {
    filterStore: { clearFilters },
  } = useCollectionFilters()
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()
  const { dao } = useOneNounsDao({ collectionAddress })

  const gridProps = { items, isReachingEnd, isValidating, handleLoadMore }

  useEffect(() => clearFilters(), [clearFilters])

  return (
    <Stack className={['zora-collections-filter-parent', styles.collections]}>
      {dao ? (
        <DaoGrid collectionAddress={collectionAddress} view={view} {...gridProps} />
      ) : (
        <CollectionGrid collectionAddress={collectionAddress} {...gridProps} />
      )}
    </Stack>
  )
}
