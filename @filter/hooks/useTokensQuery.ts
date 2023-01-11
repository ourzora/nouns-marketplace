import useSWRInfinite from 'swr/infinite'
import {
  FilteredTokensQuery,
  NetworkInput,
  PaginationInput,
  TokenSortInput,
  TokenWithMarketsSummary,
  TokensQueryFilter,
  TokensQueryInput,
} from 'types/zora.api.generated'

import { FILTERED_TOKENS } from 'data/filteredTokens'

import { useCallback } from 'react'

import { flatten } from 'lodash'

import { getAddress } from '@ethersproject/address'
import { zoraApiFetcher } from '@shared'

const PAGE_SIZE = 12 // must be divisible by 2,3,4 to ensure grid stays intact

export interface UseTokenQueryProps {
  contractAllowList?: string[] | undefined
  contractAddress?: string | null
  ownerAddress?: string
  initialData?: PaginatedFilteredTokensQueryResponse
  sort?: TokenSortInput
  filter?: TokensQueryFilter
  where?: TokensQueryInput
  initialPageSize?: number
  refreshInterval?: number
}

// async function _getNFTs(query: TokensQueryArgs): Promise<GetNFTReturnType> {
//   const resp = await zdk.tokens(query)
//   const tokens = resp.tokens.nodes
//     /* @ts-ignore */
//     .map((token) => transformNFTZDK(token, { rawData: token }))
//     .map(prepareJson)
//   return {
//     tokens,
//     nextCursor: resp.tokens.pageInfo.endCursor,
//   }
// }

export type PaginatedFilteredTokensQueryResponse = {
  tokens: TokenWithMarketsSummary[]
  nextCursor?: string | null
}

type FilteredTokensQueryParams = {
  where?: TokensQueryInput
  sort?: TokenSortInput
  filter?: TokensQueryFilter
  pagination?: PaginationInput
  networks: NetworkInput[]
}

async function getNFTs(
  query: FilteredTokensQueryParams
): Promise<PaginatedFilteredTokensQueryResponse> {
  const res = await zoraApiFetcher<FilteredTokensQuery>(FILTERED_TOKENS, query)

  return {
    tokens: res.tokens.nodes,
    nextCursor: res.tokens.pageInfo.endCursor, // @bj wanna discuss it
  }
}

export function useTokensQuery({
  contractAllowList,
  contractAddress,
  ownerAddress,
  sort,
  filter,
  where,
  initialData,
  refreshInterval = 30000,
}: UseTokenQueryProps) {
  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedFilteredTokensQueryResponse | null
  ) => {
    if (pageIndex > 0 && !previousPageData?.nextCursor) return null // reached the end
    return {
      where: {
        ...(contractAddress && {
          collectionAddresses: ownerAddress
            ? contractAllowList
            : getAddress(contractAddress),
        }),
        ...(ownerAddress && {
          collectionAddresses: contractAllowList,
          ownerAddresses: [getAddress(ownerAddress)],
        }),
        ...where,
      },
      sort,
      filter,
      pagination: {
        after: previousPageData?.nextCursor,
        limit: PAGE_SIZE,
      },
    }
  }

  const { data, error, setSize, size, isValidating } =
    useSWRInfinite<PaginatedFilteredTokensQueryResponse>(getKey, getNFTs, {
      fallbackData: initialData && [initialData],
      refreshInterval: refreshInterval,
    })

  if (error) {
    console.error(error)
  }

  const handleLoadMore = useCallback(() => setSize(size + 1), [setSize, size])
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.length === 0
  const isReachingEnd = isEmpty || (data && [data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  console.log({ data, f: flatten(data) })

  return {
    data: flatten(data),
    isValidating,
    isRefreshing,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    handleLoadMore,
  }
}
