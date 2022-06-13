import { useCallback, useMemo, useState } from 'react'
import { Currency } from '@market/utils/currencies'
import { MediaType } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { removeItemAtIndex } from '@media/utils/store'

type Address = string
export type SelectOption<T> = { label: string; value: T }
export type Status<T> = T

export type FilterState = {
  marketStatus: MarketStatusFilter
  ownerStatus: OwnerStatusFilter[]
  mediaType: MediaTypeFilter
  sortMethod: SortMethodType
  priceRange: PriceRangeFilter | null
  tokenContracts: TokenContractsFilter
  collectionAttributes: CollectionAttributesFilter
}

export type MarketStatusFilter = 'live' | 'buy-now' | 'reserve-not-met' | null
export type MediaTypeFilter = MediaType | null
export type OwnerStatusFilter = 'collected' | 'minted' | null
export type SortMethodType =
  // | 'recently-active'
  'ending-soon' | 'lowest-price' | 'highest-price' | 'newest' | 'oldest' | null
export type PriceRangeFilter = { min?: number; max?: number; currency: Currency } | null
export type TokenContractsFilter = Address | null
export type CollectionAttributeFilterValue = { traitType: string; value: string }
export type CollectionAttributesFilter = CollectionAttributeFilterValue[]

export type FilterStore = {
  filters: FilterState
  showFilters: boolean
  toggleShowFilters: () => void
  setMarketStatus: (marketStatus: Status<MarketStatusFilter>) => void
  setOwnerStatus: (ownerStatus: Status<OwnerStatusFilter>) => void
  setMediaType: (mediaType: Status<MediaTypeFilter>) => void
  setSortMethod: (sortMethod: SortMethodType) => void
  setPriceRange: (priceRange: PriceRangeFilter | null) => void
  setTokenContracts: (tokenContracts: TokenContractsFilter) => void
  setCollectionAttributes: (collectionAttributes: CollectionAttributeFilterValue) => void
  clearFilters: () => void
  hasFilters: boolean
}

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
  showFilters: true,
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
}

export function useFilterStore(initialFilters = initialFilterState): FilterStore {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [showFilters, setShowFilters] = useState(true)

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
