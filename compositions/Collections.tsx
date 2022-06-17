import { Filter, useCollectionFilters } from '@filter'
import { NFTGrid } from '@media/NFTGrid'

export function Collections() {
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()

  return (
    <Filter
      itemCount={items.length}
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
