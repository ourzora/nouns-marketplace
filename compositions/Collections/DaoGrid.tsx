import { useMemo } from 'react'

import { Filter } from '@filter'
import { NFTCard } from '@media/NFTCard'
import { NFTGrid } from '@media/NFTGrid'
import { nftGridWrapper } from '@media/NftMedia.css'
import { useNounishAuctionQuery } from '@noun-auction'
import { NFTObject } from '@zoralabs/nft-hooks'

import { NounishActivityRow } from './NounishActivityRow'

type DaoGridProps = {
  collectionAddress: string
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd?: boolean
  handleLoadMore?: () => void
  view?: 'activity' | 'nfts' | string
}

export function DaoGrid({
  view,
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
  collectionAddress,
}: DaoGridProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })
  const tokenId = activeAuction?.tokenId

  const renderer = useMemo(() => {
    if (!tokenId) return <></>

    return view === 'nfts' ? (
      <NFTCard collectionAddress={collectionAddress} />
    ) : (
      <NounishActivityRow collectionAddress={collectionAddress} tokenId={tokenId} />
    )
  }, [collectionAddress, tokenId, view])

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
