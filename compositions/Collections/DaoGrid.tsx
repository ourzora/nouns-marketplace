import { TokenWithMarketsSummary } from 'types/zora.api.generated'

import { useMemo } from 'react'

import { Filter } from '@filter'
import { NFTCard } from '@media'
import { NFTGrid2 } from '@media/NFTGrid2'
import { nftGridWrapper } from '@media/NftMedia.css'

type DaoGridProps = {
  collectionAddress: string
  items: TokenWithMarketsSummary[]
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
  const renderer = useMemo(() => {
    return <NFTCard collectionAddress={collectionAddress} />
  }, [collectionAddress])

  return (
    <Filter className="dao-filter">
      <NFTGrid2
        items={items}
        handleLoadMore={handleLoadMore}
        isReachingEnd={isReachingEnd}
        isValidating={isValidating}
        className={nftGridWrapper({
          layout: 'grid',
        })}
      />
    </Filter>
  )
}
