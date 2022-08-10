import { zdk } from '@shared'
import useSWR from 'swr'

export function useCollection(collectionAddress: string) {
  const { data, error } = useSWR(
    ['collectionInfo', collectionAddress],
    (_, collectionAddress) =>
      zdk.collection({
        address: collectionAddress,
        includeFullDetails: true,
      })
  )

  return {
    collection: data,
    error,
  }
}
