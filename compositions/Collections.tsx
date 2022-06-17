import {
  Filter,
  useTokensQuery,
  sortMethodToSortParams,
  attributesToFilterParams,
  priceRangeToQueryParams,
  marketTypeToFilterParams,
  useCollectionFilters,
} from '@filter'
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
    filterStore: { filters },
  } = useCollectionFilters()

  const {
    data: items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useTokensQuery({
    contractAddress: contractAddress ? contractAddress : undefined,
    ownerAddress,
    initialData: initialPage,
    sort: sortMethodToSortParams(filters.sortMethod, filters.marketStatus),
    filter: {
      ...marketTypeToFilterParams(filters.marketStatus),
      ...priceRangeToQueryParams(filters.priceRange),
      mediaType: filters.mediaType,
      ...attributesToFilterParams(filters.collectionAttributes),
    },
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
