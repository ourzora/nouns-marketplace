import { useEffect } from 'react'

import { Filter, useCollectionFilters } from '@filter'

import { NFTGridTestData } from './NFTGridTestData'

export function CollectionsTest({ collectionAddress }: { collectionAddress?: string }) {
  const {
    filterStore: { clearFilters },
    items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useCollectionFilters()

  useEffect(() => {
    clearFilters()
  }, [collectionAddress, clearFilters])

  return (
    <Filter>
      <NFTGridTestData
        items={items}
        handleLoadMore={handleLoadMore}
        isReachingEnd={isReachingEnd}
        isValidating={isValidating}
      />
    </Filter>
  )
}
