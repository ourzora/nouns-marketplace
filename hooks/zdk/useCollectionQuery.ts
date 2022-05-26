import { zdkAlphaService } from 'utils/zdk'
import useSWR from 'swr'

export function useCollectionQuery(collectionAddress: string) {
  const { data, error } = useSWR(
    ['collectionInfo', collectionAddress],
    (_, collectionAddress) =>
      zdkAlphaService.collection({
        address: collectionAddress,
      })
  )

  return {
    collection: data,
    error,
  }
}
