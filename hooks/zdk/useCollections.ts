import { zdkAlphaService } from 'utils/zdk'
import useSWR from 'swr'

const fetchCollections = async (collections: string[]) => {
  try {
    const responses = await Promise.all(
      collections.map((address) => {
        const response = zdkAlphaService.collection({
          address: address,
        })
        return response
      })
    )
    return {
      data: responses,
    }
  } catch (error) {
    return { data: undefined, error }
  }
}

export function useCollections(collectionAddresses: string[]) {
  const { data, error } = useSWR([collectionAddresses], fetchCollections)
  return {
    collections: data?.data,
    error,
  }
}
