import { initialFilterStore, useFilterStore } from '@filter/state/filterStore'
import { createContext, useContext, useMemo } from 'react'
import { useTokensQuery } from '@filter/hooks/useTokensQuery'
import {
  sortMethodToSortParams,
  attributesToFilterParams,
  priceRangeToQueryParams,
  marketTypeToFilterParams,
} from '@filter'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { stringDefaults, themeDefaults } from '@filter/constants'
import {
  CollectionFilterContextTypes,
  CollectionFilterProviderProps,
} from '@filter/typings'

const CollectionFilterContext = createContext<CollectionFilterContextTypes>({
  filterStore: initialFilterStore,
  items: [],
  isValidating: false,
  isReachingEnd: false,
  isEmpty: true,
  handleLoadMore: () => {},
  hasActiveMarkets: false,
  contractWhiteList: undefined,
  contractAddress: undefined,
  ownerAddress: undefined,
  strings: stringDefaults,
  theme: themeDefaults,
})

const constDefaults = { ...stringDefaults, ...themeDefaults }

export function useCollectionFilters() {
  const filterContext = useContext(CollectionFilterContext)

  const getString = (stringName: keyof typeof constDefaults) => {
    return { ...filterContext.strings, ...filterContext.theme }[stringName]
  }

  return {
    ...filterContext,
    getString,
  }
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
  useSidebarClearButton = false,
  useSidebarFilter = true,
  useFilterOwnerCollections = false,
  strings = stringDefaults,
  theme = themeDefaults,
}: CollectionFilterProviderProps) {
  const filterStore = useFilterStore(filtersVisible)

  const {
    data: items,
    isValidating,
    isReachingEnd,
    isEmpty,
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
      ...attributesToFilterParams(filterStore.filters.collectionAttributes),
      mediaType: filterStore.filters.mediaType,
    },
  })

  // - Allows us to adjust the options available to users when sorting (eg. no sorting by price when there are no prices!)
  const tokensHaveActiveMarkets = useMemo(
    () =>
      items.filter((token) =>
        token.markets?.map((mkt) =>
          [MARKET_INFO_STATUSES.ACTIVE, MARKET_INFO_STATUSES.PENDING].includes(mkt.status)
        )
      ).length > 0,
    [items]
  )

  return (
    <CollectionFilterContext.Provider
      value={{
        filterStore,
        items,
        isValidating,
        isReachingEnd,
        isEmpty,
        handleLoadMore,
        contractAddress,
        ownerAddress,
        hasActiveMarkets: tokensHaveActiveMarkets,
        useMarketStatus,
        useOwnerStatus,
        useMediaTypes,
        useSortDropdown,
        usePriceRange,
        useCollectionSearch,
        useCollectionProperties,
        useFilterOwnerCollections,
        filtersVisible,
        useSidebarClearButton,
        useSidebarFilter,
        strings,
        theme,
      }}
    >
      {children}
    </CollectionFilterContext.Provider>
  )
}
