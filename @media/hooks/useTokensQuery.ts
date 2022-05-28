import { getAddress } from '@ethersproject/address'
import { transformNFTZDKAlpha } from '@zoralabs/nft-hooks/dist/backends'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { ZDK } from '@zoralabs/zdk-alpha'
import {
  MarketCategory,
  SortDirection,
  TokenSortKey,
} from '@zoralabs/zdk-alpha/dist/queries/queries-sdk'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'

interface UseCollectionQueryProps {
  contractAddress?: string[]
  ownerAddress?: string
  initialData?: NFTObject[]
  pageSize?: number
}

const zdkAlpha = new ZDK('https://api.zora.co/graphql')

async function getNFTs(query: any): Promise<NFTObject[]> {
  const resp = await zdkAlpha.tokens(query)
  return resp.tokens.nodes
    .map((token) => transformNFTZDKAlpha(token, { rawData: token }))
    .map(prepareJson)
}

export function useTokensQuery({
  contractAddress,
  ownerAddress,
  initialData = [],
  pageSize = 8,
}: UseCollectionQueryProps) {
  const getKey = (pageIndex: number = 0, previousPageData: NFTObject[]) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return {
      where: {
        ...(contractAddress && {
          collectionAddresses: contractAddress,
        }),
        ...(ownerAddress && {
          ownerAddresses: [getAddress(ownerAddress)],
        }),
      },
      sort: {
        sortDirection: SortDirection.Desc,
        sortAxis: MarketCategory.Ask,
        sortKey: TokenSortKey.EthPrice,
      },
      pagination: {
        offset: pageIndex * pageSize,
        limit: pageSize,
      },
    }
  }

  const { data, error, setSize, size, isValidating } = useSWRInfinite<NFTObject[]>(
    getKey,
    getNFTs,
    {
      fallbackData: [initialData],
    }
  )

  const handleLoadMore = useCallback(() => setSize(size + 1), [setSize, size])

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < pageSize)
  const isRefreshing = isValidating && data && data.length === size

  return {
    data: flatten(data),
    isValidating,
    isRefreshing,
    isLoadingMore,
    isReachingEnd,
    handleLoadMore,
  }
}
