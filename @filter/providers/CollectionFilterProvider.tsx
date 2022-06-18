import { initialFilterStore, useFilterStore } from '@filter/state/filterStore'
import { createContext, useContext } from 'react'
import { useTokensQuery } from '@filter/hooks/useTokensQuery'
import {
  sortMethodToSortParams,
  attributesToFilterParams,
  priceRangeToQueryParams,
  marketTypeToFilterParams,
} from '@filter'

import {
  CollectionFilterContextTypes,
  CollectionFilterProviderProps,
} from '@filter/typings'

const CollectionFilterContext = createContext<CollectionFilterContextTypes>({
  filterStore: initialFilterStore,
  items: [],
  isValidating: false,
  isReachingEnd: false,
  handleLoadMore: () => {},
  contractWhiteList: undefined,
  contractAddress: undefined,
  ownerAddress: undefined,
})

export function useCollectionFilters() {
  return useContext(CollectionFilterContext)
}

export function CollectionFilterProvider({
  contractAddress,
  ownerAddress,
  initialPage,
  contractWhiteList,
  children,
  filtersVisible = false,
  useMarketStatus = false,
  useOwnerStatus = false,
  useMediaTypes = false,
  useSortDropdown = false,
  useCollectionSearch = false,
  usePriceRange,
  useCollectionProperties,
}: CollectionFilterProviderProps) {
  const filterStore = useFilterStore(filtersVisible)

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
        ownerAddress,
        useMarketStatus,
        useOwnerStatus,
        useMediaTypes,
        useSortDropdown,
        usePriceRange,
        useCollectionSearch,
        useCollectionProperties,
        filtersVisible,
      }}
    >
      {children}
    </CollectionFilterContext.Provider>
  )
}
