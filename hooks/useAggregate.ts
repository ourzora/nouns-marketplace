import { zdk } from '@shared'
import useSWR from 'swr'
import { NetworkInput } from 'utils/network'

export function useAggregate(collectionAddress: string) {
  const { data, error } = useSWR(
    ['collectionInfo', collectionAddress],
    (_, collectionAddress) =>
      zdk.collectionStatsAggregate({
        collectionAddress: collectionAddress,
        network: NetworkInput,
      })
  )

  return {
    aggregate: data,
    error,
  }
}
