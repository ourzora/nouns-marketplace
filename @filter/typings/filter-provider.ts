import { NFTObject } from '@zoralabs/nft-hooks'
import { FilterStore } from './filter-store'
import { ReactNode } from 'react'

export type FilterOptionConfig = {
  label?: string
  defaultState?: 'open' | undefined
  hideBorder?: boolean
  selector?: string
}

export type PriceRangeFilterConfig = {
  hideCurrencySelect?: boolean
} & FilterOptionConfig

export type PropertiesConfig = {
  header?: string
} & FilterOptionConfig

export interface FilterConfigProps {
  filtersVisible?: boolean
  useMarketStatus?: boolean
  useOwnerStatus?: boolean
  useMediaTypes?: boolean
  useSortDropdown?: boolean
  usePriceRange?: PriceRangeFilterConfig | undefined
  useCollectionSearch?: boolean
  useCollectionProperties?: PropertiesConfig | undefined
}

export interface FilterContextInputProps extends FilterConfigProps {
  contractAddress?: string | null
  ownerAddress?: string
  contractWhiteList?: string[] | undefined
}

export interface TokenQueryReturnTypes extends FilterContextInputProps {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd: boolean | undefined
  handleLoadMore: () => void
}

export interface CollectionFilterContextTypes extends TokenQueryReturnTypes {
  filterStore: FilterStore
}

export interface CollectionFilterProviderProps extends FilterContextInputProps {
  children?: ReactNode
  initialPage?: NFTObject[]
}