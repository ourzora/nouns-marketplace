import { useCallback, useMemo, useState } from 'react'
import { MediaType } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { removeItemAtIndex } from '../utils/store'
import {
  SelectOption,
  MarketStatusFilter,
  OwnerStatusFilter,
  MediaTypeFilter,
  SortMethodType,
  FilterState,
  FilterStore,
  PriceRangeFilter,
  TokenContractsFilter,
  CollectionAttributeFilterValue,
} from '@filter/typings'

export const marketStatusOptions: SelectOption<MarketStatusFilter>[] = [
  { label: 'Live Auction', value: 'live' },
  { label: 'Buy Now', value: 'buy-now' },
  { label: 'Reserve Not Met', value: 'reserve-not-met' },
]

export const ownerStatusOptions: SelectOption<OwnerStatusFilter>[] = [
  { label: 'Collected', value: 'collected' },
  { label: 'Minted', value: 'minted' },
]

export const mediaTypeOptions: SelectOption<MediaTypeFilter>[] = [
  { label: 'Image', value: MediaType.Image },
  { label: 'GIF', value: MediaType.Gif },
  { label: 'Video', value: MediaType.Video },
  { label: 'Audio', value: MediaType.Audio },
  { label: 'Text', value: MediaType.Text },
  { label: 'HTML', value: MediaType.Html },
]

export const sortMethodOptions: SelectOption<SortMethodType>[] = [
  // { label: 'Recently Active', value: 'recently-active' },
  { label: 'Ending Soon', value: 'ending-soon' },
  { label: 'Lowest Price', value: 'lowest-price' },
  { label: 'Highest Price', value: 'highest-price' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]

export const initialFilterState: FilterState = {
  marketStatus: null,
  ownerStatus: [],
  mediaType: null,
  sortMethod: 'newest',
  priceRange: null,
  tokenContracts: null,
  collectionAttributes: [],
}

export const initialFilterStore: FilterStore = {
  filters: initialFilterState,
  toggleShowFilters: () => {},
  setMarketStatus: () => {},
  setOwnerStatus: () => {},
  setMediaType: () => {},
  setSortMethod: () => {},
  setPriceRange: () => {},
  setTokenContracts: () => {},
  setCollectionAttributes: () => {},
  clearFilters: () => {},
  hasFilters: false,
  showFilters: true,
}

export function useFilterStore(
  filtersVisible: boolean = initialFilterStore.showFilters
): FilterStore {
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [showFilters, setShowFilters] = useState(filtersVisible)

  const setMarketStatus = useCallback(
    (marketStatus: MarketStatusFilter) => {
      setFilters({
        ...filters,
        marketStatus: marketStatus === filters.marketStatus ? null : marketStatus,
      })
    },
    [filters]
  )

  const setOwnerStatus = useCallback(
    (ownerStatus: OwnerStatusFilter) => {
      setFilters({
        ...filters,
        ownerStatus: filters.ownerStatus.includes(ownerStatus)
          ? filters.ownerStatus.filter((item) => item !== ownerStatus)
          : [ownerStatus],
      })
    },
    [filters]
  )

  const setMediaType = useCallback(
    (mediaType: MediaTypeFilter) => {
      setFilters({
        ...filters,
        mediaType: mediaType === filters.mediaType ? null : mediaType,
      })
    },
    [filters]
  )

  const setRecentActivity = useCallback(
    (recentActivity: SortMethodType) => {
      setFilters({
        ...filters,
        sortMethod: recentActivity,
      })
    },
    [filters]
  )

  const setPriceRange = useCallback(
    (priceRange: PriceRangeFilter) => {
      setFilters({
        ...filters,
        priceRange,
      })
    },
    [filters]
  )

  const setTokenContracts = useCallback(
    (tokenContracts: TokenContractsFilter) => {
      setFilters({
        ...filters,
        tokenContracts: tokenContracts !== filters.tokenContracts ? tokenContracts : null,
        collectionAttributes: [],
      })
    },
    [filters]
  )

  const setCollectionAttributes = useCallback(
    (attribute: CollectionAttributeFilterValue) => {
      const index = filters.collectionAttributes.findIndex(
        (a) => a.traitType === attribute.traitType && a.value === attribute.value
      )
      setFilters({
        ...filters,
        collectionAttributes:
          index >= 0
            ? removeItemAtIndex(filters.collectionAttributes, index)
            : [...filters.collectionAttributes, attribute],
      })
    },
    [filters]
  )

  const clearFilters = useCallback(() => {
    setFilters(initialFilterState)
  }, [setFilters])

  const toggleShowFilters = useCallback(() => {
    setShowFilters(!showFilters)
  }, [setShowFilters, showFilters])

  const hasFilters = useMemo(() => {
    return !(JSON.stringify(filters) === JSON.stringify(initialFilterState))
  }, [filters])

  return {
    toggleShowFilters,
    filters,
    clearFilters,
    setMarketStatus,
    setOwnerStatus,
    setMediaType,
    setSortMethod: setRecentActivity,
    setPriceRange,
    setTokenContracts,
    setCollectionAttributes,
    showFilters,
    hasFilters,
  }
}
