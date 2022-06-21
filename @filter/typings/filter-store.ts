import { MediaType } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Currency } from '@shared/constants/currencies'

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

export type UseFiltersProps = {
  initialFilterState: FilterState
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
  collections?: string[]
  filters: FilterState
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
  showFilters: boolean
}

export type FilterProviderProps = {
  initialFilters: FilterStore
}