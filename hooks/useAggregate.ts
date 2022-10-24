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
      })
  )

  return {
    aggregate: zdkAggregate as CollectionStatsAggregateQuery,
    error: zdkAggregateError,
  }
}
