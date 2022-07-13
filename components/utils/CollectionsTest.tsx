import { Filter, useCollectionFilters } from '@filter'
import { useEffect } from 'react'
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
    <Filter
      grid={
        <NFTGridTestData
          items={items}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
        />
      }
    />
  )
}
