import { useCallback, useEffect, useMemo, useState } from 'react'
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
  priceRangeSelection: () => {},
  setTokenContracts: () => {},
  setCollectionAttributes: () => {},
  clearFilters: () => {},
  clearPriceRange: () => {},
  hasFilters: false,
  activeFilterCount: 1,
  showFilters: true,
  invalidPriceRange: false,
}

export function useFilterStore(
  filtersVisible: boolean = initialFilterStore.showFilters
): FilterStore {
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [showFilters, setShowFilters] = useState(filtersVisible)

  const [priceRange, setPriceRangeSelect] = useState<PriceRangeFilter | null>(null)
  const [invalidPriceRange, setInvalidPriceRange] = useState(true)

  const priceRangeSelection = useCallback((event: any) => {
    setPriceRangeSelect({
      min: event.min,
      max: event.max,
      currency: event.currency,
    })
    if (event.min >= 0 && event.max > 0 && !event.error) {
      setInvalidPriceRange(false)
    } else {
      setInvalidPriceRange(true)
    }
  }, [])

  useEffect(() => {
    setShowFilters(filtersVisible)
  }, [filtersVisible])

  const setPriceRange = useCallback(() => {
    setFilters({
      ...filters,
      priceRange,
    })
  }, [filters, priceRange])

  const clearPriceRange = useCallback(() => {
    const priceRange = null
    setFilters({
      ...filters,
      priceRange,
    })
  }, [filters, priceRange])

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

  const activeFilterCount = useMemo(() => {
    const { sortMethod, ...rest } = filters
    let count = 0
    Object.values(rest).map((f) => {
      if (Array.isArray(f) && f?.length === 0) {
        return false
      } else {
        if (Array.isArray(f)) {
          count = count + f.length
          return
        }
        return f && count++
      }
    })
    return count
  }, [filters])

  const hasFilters = useMemo(() => {
    return activeFilterCount > 0
  }, [activeFilterCount])

  return {
    filters,
    toggleShowFilters,
    clearFilters,
    setMarketStatus,
    setOwnerStatus,
    setMediaType,
    setSortMethod: setRecentActivity,
    setPriceRange,
    priceRangeSelection,
    setTokenContracts,
    setCollectionAttributes,
    clearPriceRange,
    showFilters,
    hasFilters,
    activeFilterCount,
    invalidPriceRange,
  }
}
