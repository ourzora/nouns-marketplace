import { useEffect, useMemo } from 'react'

import { Filter, useCollectionFilters } from '@filter'
import { NFTCard } from '@media/NFTCard'
import { NFTGrid } from '@media/NFTGrid'
import { nftGridWrapper } from '@media/NftMedia.css'
import { useNounishAuctionQuery, useOneNounsDao } from '@noun-auction'
import { NFTObject } from '@zoralabs/nft-hooks'

import { NounishActivityRow } from './NounishActivityRow'

type CollectionsGridProps = {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd?: boolean
  handleLoadMore?: () => void
}

export type CollectionsProps = {
  collectionAddress: string
  view?: 'activity' | 'nfts' | string
}

export function CollectionGrid({
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
}: CollectionsGridProps) {
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

export function DaoGrid({
  view,
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
  collectionAddress,
}: {
  view: CollectionsProps['view']
  collectionAddress: string
} & CollectionsGridProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })
  const tokenId = activeAuction?.tokenId

  const renderer = useMemo(() => {
    if (!tokenId) return <></>
    return view === 'nfts' ? (
      <NFTCard />
    ) : (
      <NounishActivityRow contractAddress={collectionAddress} tokenId={tokenId} />
    )
  }, [collectionAddress, tokenId, view])

  // const { data: activeAuction } = useActiveNounishAuction(dao?.marketType)
  // const filteredItems = useMemo(() => {
  //   try {
  //     return items.filter(
  //       (item) => activeAuction?.properties?.tokenId !== item?.nft?.tokenId
  //     )
  //   } catch (err: any) {
  //     Sentry.captureException(err)
  //     Sentry.captureMessage('DAO Grid filter error: ' + err.message)
  //     return items
  //   }
  // }, [items, activeAuction?.properties?.tokenId])

  return (
    <Filter
      grid={
        <NFTGrid
          items={items} // filteredItems
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

export function Collections({ view = 'nfts', collectionAddress }: CollectionsProps) {
  const {
    filterStore: { clearFilters },
  } = useCollectionFilters()
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()

  const dao = useOneNounsDao({ contractAddress: collectionAddress })

  const gridProps = { items, isReachingEnd, isValidating, handleLoadMore }

  useEffect(() => {
    clearFilters()
  }, [clearFilters])

  if (!dao) {
    return <CollectionGrid {...gridProps} />
  } else if (collectionAddress) {
    return <DaoGrid collectionAddress={collectionAddress} view={view} {...gridProps} />
  } else {
    return null
  }
}
