import { zdk } from '@shared'
import useSWR from 'swr'
import { NetworkInput } from 'utils/network'
import { returnDao } from 'constants/collection-addresses'
import { useEffect } from 'react'
import { CollectionStatsAggregateQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'

export function useAggregate(collectionAddress: string) {
  const isDao = returnDao(collectionAddress) !== undefined

  const { data: zdkAggregate, error: zdkAggregateError } = useSWR(
    [`collectionInfo-${collectionAddress}`, collectionAddress],
    (_, collectionAddress) =>
      zdk.collectionStatsAggregate({
        collectionAddress: collectionAddress,
        network: NetworkInput,
      })
  )

  useEffect(() => {
    console.log({ 'isDao:': isDao, 'zdkAggregate:': zdkAggregate })
  }, [isDao, zdkAggregate])

  return {
    aggregate: zdkAggregate as CollectionStatsAggregateQuery,
    error: zdkAggregateError,
  }
}
