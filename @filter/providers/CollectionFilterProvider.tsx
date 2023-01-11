import { TokenWithMarketsSummary } from 'types/zora.api.generated'

import { ReactNode, createContext, useContext, useMemo } from 'react'

import {
  attributesToFilterParams,
  marketTypeToFilterParams,
  priceRangeToQueryParams,
  sortMethodToSortParams,
} from '@filter'
import { stringDefaults, themeDefaults } from '@filter/constants'
import {
  PaginatedFilteredTokensQueryResponse,
  useTokensQuery,
} from '@filter/hooks/useTokensQuery'
import { initialFilterStore, useFilterStore } from '@filter/state/filterStore'
import {
  CollectionFilterContextTypes,
  CollectionFilterProviderProps,
  FilterContextInputProps,
} from '@filter/typings'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'

const CollectionFilterContext = createContext<CollectionFilterContextTypes>({
  filterStore: initialFilterStore,
  items: [],
  isValidating: false,
  isReachingEnd: false,
  isEmpty: true,
  handleLoadMore: () => {},
  hasActiveMarkets: false,
  contractAllowList: undefined,
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
  contractAllowList,
  children,
  filtersVisible = false,
  enableMarketStatus = false,
  enableOwnerStatus = false,
  enableMediaTypes = false,
  enableSortDropdown = true,
  enableSelectedFiltersPanel = false,
  enableFilterToggleButton = false,
  enableCollectionSearch = false,
  enablePriceRange,
  useCollectionProperties,
  enableSidebarClearButton = false,
  enableSidebarFilter = true,
  useFilterOwnerCollections = false,
  strings = stringDefaults,
  theme = themeDefaults,
}: {
  children?: ReactNode
  initialPage?: PaginatedFilteredTokensQueryResponse
} & FilterContextInputProps) {
  const filterStore = useFilterStore(filtersVisible)
  const { filters } = filterStore
  const {
    data: items,
    isValidating,
    isReachingEnd,
    isEmpty,
    handleLoadMore,
  } = useTokensQuery({
    contractAllowList,
    contractAddress,
    ownerAddress,
    initialData: initialPage,
    refreshInterval: 60000,
    sort: sortMethodToSortParams(filters.sortMethod, filters.marketStatus),
    filter: {
      ...marketTypeToFilterParams(filters.marketStatus),
      ...priceRangeToQueryParams(filters.priceRange),
      ...attributesToFilterParams(filters.collectionAttributes),
      mediaType: filters.mediaType,
    },
  })

  console.log({ AAAA: items })

  const tokensWithActiveMarkets = useMemo(() => {
    if (items.length === 0) return []

    return items[0].tokens.filter((token) =>
      token.marketsSummary?.map((mkt) =>
        [
          MARKET_INFO_STATUSES.ACTIVE.toString(),
          MARKET_INFO_STATUSES.PENDING.toString(),
        ].includes(mkt.status)
      )
    )
  }, [items])

  // - Allows us to adjust the options available to users when sorting (eg. no sorting by price when there are no prices!)
  const tokensHaveActiveMarkets = useMemo(
    () => tokensWithActiveMarkets.length > 0,
    [tokensWithActiveMarkets]
  )

  return (
    <CollectionFilterContext.Provider
      value={{
        filterStore,
        items: items.length > 0 ? items[0].tokens : ([] as TokenWithMarketsSummary[]),
        isValidating,
        isReachingEnd,
        isEmpty,
        handleLoadMore,
        contractAddress,
        ownerAddress,
        hasActiveMarkets: tokensHaveActiveMarkets,
        enableMarketStatus,
        enableOwnerStatus,
        enableMediaTypes,
        enableSortDropdown,
        enableSelectedFiltersPanel,
        enableFilterToggleButton,
        enablePriceRange,
        enableCollectionSearch,
        useCollectionProperties,
        useFilterOwnerCollections,
        filtersVisible,
        enableSidebarClearButton,
        enableSidebarFilter,
        strings,
        theme,
      }}
    >
      {children}
    </CollectionFilterContext.Provider>
  )
}
