import { Filter } from '@filter'
import { NFTCard } from '@media/NFTCard'
import { NFTGrid } from '@media/NFTGrid'
import { nftGridWrapper } from '@media/NftMedia.css'
import { NFTObject } from '@zoralabs/nft-hooks'

type CollectionsGridProps = {
  collectionAddress: string
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd?: boolean
  handleLoadMore?: () => void
}

export function CollectionGrid({
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
  collectionAddress,
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
          nftRenderer={<NFTCard collectionAddress={collectionAddress} />}
          className={nftGridWrapper()}
        />
      }
    />
  )
}
