import { NetworkInput } from 'utils/network'

import useSWR from 'swr'

import { zdk } from '@shared'
import { CollectionStatsAggregateQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'

export function useAggregate(collectionAddress: string) {
  const { data: zdkAggregate, error: zdkAggregateError } = useSWR(
    [`collectionInfo-${collectionAddress}`, collectionAddress],
    (_, collectionAddress) =>
      zdk.collectionStatsAggregate({
        collectionAddress: collectionAddress,
        network: NetworkInput,
      }),
    {
      dedupingInterval: 3000,
      refreshInterval: 10000,
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        // Only retry up to 10 times.
        if (retryCount >= 10) return
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }
  )

  return {
    aggregate: zdkAggregate as CollectionStatsAggregateQuery,
    error: zdkAggregateError,
  }
}
