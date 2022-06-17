import { NFTObject } from '@zoralabs/nft-hooks'
import { FilterStore } from './filter-store'
import { ReactNode } from 'react'

export interface FilterConfigProps {
  filtersVisible?: boolean
  useMarketStatus?: boolean
  useOwnerStatus?: boolean
  useMediaTypes?: boolean
  useSortMethod?: boolean
  usePriceRange?: boolean
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
