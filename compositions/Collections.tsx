import { Filter, useCollectionFilters } from '@filter'
import { NFTGrid } from '@media/NFTGrid'
import { useEffect } from 'react'

export function Collections({ collectionAddress }: { collectionAddress?: string }) {
  const {
    filterStore: { clearFilters },
    items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useCollectionFilters()

  useEffect(() => {
    clearFilters()
  }, [collectionAddress])

  return (
    <Filter
      grid={
        <NFTGrid
          items={items}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
        />
      }
    />
  )
}
