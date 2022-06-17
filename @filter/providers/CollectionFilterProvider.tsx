import { FilterStore, initialFilterStore, useFilterStore } from '../state/filterStore'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import { useTokensQuery } from '@filter/hooks/useTokensQuery'
import {
  sortMethodToSortParams,
  attributesToFilterParams,
  priceRangeToQueryParams,
  marketTypeToFilterParams,
} from '@filter'
import { NFTObject } from '@zoralabs/nft-hooks'

const CollectionFilterContext = createContext<{
  filterStore: FilterStore
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd: boolean | undefined
  handleLoadMore: () => void
  contractWhiteList?: string[] | undefined
  contractAddress?: string | undefined | null
}>({
  filterStore: initialFilterStore,
  items: [],
  isValidating: false,
  isReachingEnd: false,
  handleLoadMore: () => {},
  contractWhiteList: undefined,
  contractAddress: undefined,
})

type CollectionFilterProviderProps = {
  children?: ReactNode
  contractAddress?: string | null
  ownerAddress?: string
  initialPage?: NFTObject[]
  contractWhiteList?: string[] | undefined
}

export function useCollectionFilters() {
  return useContext(CollectionFilterContext)
}

export function CollectionFilterProvider({
  contractAddress,
  ownerAddress,
  initialPage,
  contractWhiteList,
  children,
}: CollectionFilterProviderProps) {
  const filterStore = useFilterStore()

  useEffect(() => {
    console.log(filterStore)
  }, [filterStore])

  const {
    data: items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useTokensQuery({
    contractWhiteList,
    contractAddress: contractAddress ? contractAddress : undefined,
    ownerAddress,
    initialData: initialPage,
    sort: sortMethodToSortParams(
      filterStore.filters.sortMethod,
      filterStore.filters.marketStatus
    ),
    filter: {
      ...marketTypeToFilterParams(filterStore.filters.marketStatus),
      ...priceRangeToQueryParams(filterStore.filters.priceRange),
      mediaType: filterStore.filters.mediaType,
      ...attributesToFilterParams(filterStore.filters.collectionAttributes),
    },
  })

  return (
    <CollectionFilterContext.Provider
      value={{
        filterStore,
        items,
        isValidating,
        isReachingEnd,
        handleLoadMore,
        contractAddress,
      }}
    >
      {children}
    </CollectionFilterContext.Provider>
  )
}
