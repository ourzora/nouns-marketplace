import { Filter, useCollectionFilters } from '@filter'
import { NFTGrid } from '@media/NFTGrid'
import { NFTCard } from '@media/NFTCard'
import { useEffect, useMemo } from 'react'
import { nftGridWrapper } from '@media/NftMedia.css'
import { NounishActivityRow } from './NounishActivityRow'
import { returnDao } from 'constants/collection-addresses'
import { useActiveNounishAuction } from '@noun-auction/hooks/useActiveNounishAuction'

export type CollectionsProps = {
  collectionAddress?: string
  view?: 'activity' | 'nfts' | string
}

export function CollectionGrid() {
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()

  return (
    <Filter
      grid={
        <NFTGrid
          items={items}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
          nftRenderer={<NFTCard />}
          className={nftGridWrapper()}
        />
      }
    />
  )
}

export function DaoGrid({ dao, view }: { dao: any; view: CollectionsProps['view'] }) {
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()
  const { data: activeAuction } = useActiveNounishAuction(dao?.marketType)

  const filteredItems = useMemo(() => {
    try {
      return items.filter(
        (item) => activeAuction?.properties?.tokenId !== item?.nft?.tokenId
      )
    } catch (err) {
      return items
    }
  }, [dao, items, activeAuction?.properties?.tokenId])

  const renderer = useMemo(() => {
    switch (view) {
      case 'nfts':
        return <NFTCard />
      case 'activity':
        return <NounishActivityRow />
      default:
        return <NFTCard />
    }
  }, [view])

  return (
    <Filter
      grid={
        <NFTGrid
          items={filteredItems}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
          nftRenderer={renderer}
          className={nftGridWrapper({
            layout: view === 'nfts' ? 'grid' : 'activityRows',
          })}
        />
      }
    />
  )
}

export function Collections({ collectionAddress, view = 'nfts' }: CollectionsProps) {
  const {
    filterStore: { clearFilters },
  } = useCollectionFilters()

  const dao = returnDao(collectionAddress)

  useEffect(() => {
    clearFilters()
  }, [collectionAddress])

  if (!dao) {
    return <CollectionGrid />
  } else {
    return <DaoGrid dao={dao} view={view} />
  }
}
