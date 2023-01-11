import { useMemo } from 'react'

import { useCollectionFilters } from '@filter'
import { Stack } from '@zord'

import * as styles from './Collections.css'
import { DaoGrid } from './DaoGrid'

export type CollectionsProps = {
  collectionAddress: string
  // view?: 'activity' | 'nfts' | string
}

export function Collections({
  // view = 'nfts',
  collectionAddress,
}: CollectionsProps) {
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()

  const gridProps = useMemo(() => {
    return {
      items,
      isReachingEnd,
      isValidating,
      handleLoadMore,
    }
  }, [items, isReachingEnd, isValidating, handleLoadMore])

  return (
    <Stack className={['zora-collections-filter-parent', styles.collections]}>
      <DaoGrid
        collectionAddress={collectionAddress}
        // view={view} // <-- TBD whether we add an Activity view
        {...gridProps}
      />
    </Stack>
  )
}
