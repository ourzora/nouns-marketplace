import { useCollectionFilters } from '@filter'
import { Stack } from '@zoralabs/zord'

import * as styles from './Collections.css'
import { DaoGrid } from './DaoGrid'

export type CollectionsProps = {
  collectionAddress: string
  view?: 'activity' | 'nfts' | string
}

export function Collections({ view = 'nfts', collectionAddress }: CollectionsProps) {
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()

  const gridProps = {
    items,
    isReachingEnd,
    isValidating,
    handleLoadMore,
  }

  console.log('COLLECTIONS')

  return (
    <Stack className={['zora-collections-filter-parent', styles.collections]}>
      <DaoGrid collectionAddress={collectionAddress} view={view} {...gridProps} />
    </Stack>
  )
}
