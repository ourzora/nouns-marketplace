import { useMemo } from 'react'

import { Filter } from '@filter'
import { NFTCard, NFTGrid } from '@media'
import { nftGridWrapper } from '@media/mediaStyles.css'
import { NFTObject } from '@zoralabs/nft-hooks'

type DaoGridProps = {
  collectionAddress: string
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd?: boolean
  handleLoadMore?: () => void
  // view?: 'activity' | 'nfts' | string
}

export function DaoGrid({
  // view,
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
  collectionAddress,
}: DaoGridProps) {
  // const { activeAuction } = useNounishAuctionQuery({
  //   collectionAddress,
  // })

  const renderer = useMemo(() => {
    // if (!activeAuction?.tokenId) return <></>

    // return view === 'nfts' || !activeAuction?.tokenId ? (
    return <NFTCard collectionAddress={collectionAddress} />
    // ) : (
    //   <NounishActivityRow
    //     collectionAddress={collectionAddress}
    //     tokenId={activeAuction?.tokenId}
    //   />
    // )
  }, [
    collectionAddress,
    // activeAuction?.tokenId,
    //  view
  ])

  return (
    <Filter className="dao-filter">
      <NFTGrid
        items={items}
        handleLoadMore={handleLoadMore}
        isReachingEnd={isReachingEnd}
        isValidating={isValidating}
        nftRenderer={renderer}
        className={nftGridWrapper({
          // layout: view === 'nfts' ? 'grid' : 'activityRows',
          layout: 'grid',
        })}
      />
    </Filter>
  )
}
