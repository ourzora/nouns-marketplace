import useSWRInfinite from 'swr/infinite'

import { useCallback, useMemo } from 'react'

import { flatten } from 'lodash'

import { getAddress } from '@ethersproject/address'
import { GetNFTReturnType } from '@shared'
import { zdk } from '@shared/utils/zdk'
import { transformNFTZDK } from '@zoralabs/nft-hooks/dist/backends'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { TokensQueryArgs } from '@zoralabs/zdk'
import {
  TokenSortInput,
  TokensQueryFilter,
  TokensQueryInput,
} from '@zoralabs/zdk/dist/queries/queries-sdk'

const PAGE_SIZE = 12 // must be divisible by 2,3,4 to ensure grid stays intact

export interface UseTokenQueryProps {
  contractAllowList?: string[] | undefined
  contractAddress?: string | null
  ownerAddress?: string
  initialData?: GetNFTReturnType
  sort?: TokenSortInput
  filter?: TokensQueryFilter
  where?: TokensQueryInput
  initialPageSize?: number
  refreshInterval?: number
}

async function getNFTs(query: TokensQueryArgs): Promise<GetNFTReturnType> {
  const resp = await zdk.tokens(query)
  const tokens = resp.tokens.nodes
    /* @ts-ignore */
    .map((token) => transformNFTZDK(token, { rawData: token }))
    .map(prepareJson)
  return {
    tokens,
    nextCursor: resp.tokens.pageInfo.endCursor,
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
  const getKey = (pageIndex: number, previousPageData: GetNFTReturnType) => {
    if (pageIndex > 0 && !previousPageData.nextCursor) return null // reached the end
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
      includeFullDetails: true,
    }
  }

  const {
    data: resp,
    error,
    setSize,
    size,
    isValidating,
  } = useSWRInfinite<GetNFTReturnType>(getKey, getNFTs, {
    fallbackData: initialData && [initialData],
    refreshInterval: refreshInterval,
  })

  const data = useMemo(() => resp?.map((r) => r.tokens), [resp])
  const flattenedData = useMemo(() => flatten(data), [data])

  const handleLoadMore = useCallback(() => setSize(size + 1), [setSize, size])

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  return {
    data: flattenedData,
    isValidating,
    isRefreshing,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    handleLoadMore,
  }
}
