import { useEffect, useMemo } from 'react'

import { Filter, useCollectionFilters } from '@filter'
import { NFTCard } from '@media/NFTCard'
import { NFTGrid } from '@media/NFTGrid'
import { nftGridWrapper } from '@media/NftMedia.css'
import { useNounishAuctionQuery, useOneNounsDao } from '@noun-auction'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack } from '@zoralabs/zord'

import * as styles from './Collections.css'
import { NounishActivityRow } from './NounishActivityRow'

type CollectionsGridProps = {
  collectionAddress: string
  tokenId: string
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd?: boolean
  handleLoadMore?: () => void
}

export type CollectionsProps = {
  tokenId: string
  collectionAddress: string
  view?: 'activity' | 'nfts' | string
}

export function CollectionGrid({
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
  collectionAddress,
  tokenId,
}: CollectionsGridProps) {
  return (
    <Filter
      className="collection-filter"
      grid={
        <NFTGrid
          items={items}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
          nftRenderer={
            <NFTCard collectionAddress={collectionAddress} tokenId={tokenId} />
          }
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
} & CollectionsGridProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })
  const tokenId = activeAuction?.tokenId

  const renderer = useMemo(() => {
    if (!tokenId) return <></>
    return view === 'nfts' ? (
      <NFTCard tokenId={tokenId} collectionAddress={collectionAddress} />
    ) : (
      <NounishActivityRow collectionAddress={collectionAddress} tokenId={tokenId} />
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
      className="dao-filter"
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

export function Collections({
  view = 'nfts',
  collectionAddress,
  tokenId,
}: CollectionsProps) {
  const {
    filterStore: { clearFilters },
  } = useCollectionFilters()
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()
  const dao = useOneNounsDao({ collectionAddress })

  const gridProps = { items, isReachingEnd, isValidating, handleLoadMore }

  useEffect(() => clearFilters(), [clearFilters])

  return (
    <Stack className={['zora-collections-filter-parent', styles.collections]}>
      {dao ? (
        <DaoGrid
          collectionAddress={collectionAddress}
          tokenId={tokenId}
          view={view}
          {...gridProps}
        />
      ) : (
        <CollectionGrid
          collectionAddress={collectionAddress}
          tokenId={tokenId}
          {...gridProps}
        />
      )}
    </Stack>
  )
}
