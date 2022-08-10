import { MediaType } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Currency } from '@shared'
import { MouseEventHandler } from 'react'

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

export type AdditionalMarketStatusFilters = 'buy-now-completed' | null
export type MarketStatusFilter =
  | 'live'
  | 'buy-now'
  | 'reserve-not-met'
  | 'buy-now-completed'
  | null
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
  setPriceRange: MouseEventHandler<HTMLButtonElement>
  priceRangeSelection: (event: any) => void
  setTokenContracts: (tokenContracts: TokenContractsFilter) => void
  setCollectionAttributes: (collectionAttributes: CollectionAttributeFilterValue) => void
  clearFilters: () => void
  clearPriceRange: () => void
  hasFilters: boolean
  activeFilterCount: number
  showFilters: boolean
  invalidPriceRange: boolean
}

export type FilterProviderProps = {
  initialFilters: FilterStore
}
