import { zdkService } from 'utils/zdk'
import useSWR from 'swr'

export function useCollection(collectionAddress: string) {
  const { data, error } = useSWR(
    ['collectionInfo', collectionAddress],
    (_, collectionAddress) =>
      zdkService.collection({
        address: collectionAddress,
        includeFullDetails: true,
      })
  )

  return {
    collection: data,
    error,
  }
}
