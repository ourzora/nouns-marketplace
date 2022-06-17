import { Filter, useTokensQuery } from '@filter'
import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTGrid } from '@media/NFTGrid'

export type CollectionProps = {
  contractAddress?: string | undefined
  ownerAddress?: string
  initialPage?: NFTObject[] | undefined
}

export function Collections({
  contractAddress,
  ownerAddress,
  initialPage,
}: CollectionProps) {
  const {
    data: items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useTokensQuery({
    contractAddress: contractAddress ? contractAddress : undefined,
    ownerAddress,
    initialData: initialPage,
  })

  return (
    <Filter
      itemCount={items.length}
      ownerAddress={ownerAddress}
      contractAddress={contractAddress}
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
