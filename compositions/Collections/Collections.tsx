import { Filter, useCollectionFilters } from '@filter'
import { NFTGrid } from '@media/NFTGrid'
import { NFTCard } from '@media/NFTCard'
import { useEffect, useMemo } from 'react'

export type CollectionsProps = {
  collectionAddress?: string
  view: 'activity' | 'nfts' | string
}

export function Collections({ collectionAddress, view = 'nfts' }: CollectionsProps) {
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

  const renderer = useMemo(() => {
    switch (view) {
      case 'nfts':
        return <NFTCard />
      case 'activity':
        return <div>NFT Activity</div>
      default:
        return <NFTCard />
    }
  }, [view])

  return (
    <Filter
      grid={
        <NFTGrid
          items={items}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
          nftRenderer={renderer}
        />
      }
    />
  )
}
