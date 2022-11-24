import { ReactNode } from 'react'

import { stringDefaults, themeDefaults } from '@filter/constants'
import { NFTObject } from '@zoralabs/nft-hooks'

import { FilterStore } from './filter-store'

export type Strings = typeof stringDefaults
export type Theme = typeof themeDefaults

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
  enableMarketStatus?: boolean
  enableOwnerStatus?: boolean
  enableMediaTypes?: boolean
  enableSortDropdown?: boolean
  enablePriceRange?: PriceRangeFilterConfig | undefined //@BJ todo: this shouldn't be a boolean AND a configuration, it's confusing
  enableCollectionSearch?: boolean
  useCollectionProperties?: PropertiesConfig | undefined //@BJ todo: this shouldn't be a boolean AND a configuration, it's confusing
  enableSidebarClearButton?: boolean
  /**
   * Flag to show or hide the Filter sidebar and visibility toggle button
   * @default true
   */
  enableSidebarFilter?: boolean
  useFilterOwnerCollections?: boolean
  strings?: Partial<Strings>
  theme?: Partial<Theme>
}

export interface FilterContextInputProps extends FilterConfigProps {
  contractAddress?: string | null
  ownerAddress?: string
  contractAllowList?: string[] | undefined
}

export interface TokenQueryReturnTypes extends FilterContextInputProps {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd: boolean | undefined
  isEmpty: boolean
  hasActiveMarkets: boolean
  handleLoadMore: () => void
}

export interface CollectionFilterContextTypes extends TokenQueryReturnTypes {
  filterStore: FilterStore
  strings: Partial<Strings>
  theme: Partial<Theme>
}

export interface CollectionFilterProviderProps extends FilterContextInputProps {
  children?: ReactNode
  initialPage?: NFTObject[]
}
