import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { zdkService } from 'utils/zdk'
import useSWR from 'swr'

const networkInput = {
  chain: Chain.Mainnet,
  network: Network.Ethereum,
}

const mergeCollectionFetch = async (address: string) => {
  const collection = await zdkService
    .collection({
      address: address,
      includeFullDetails: true,
    })
    .then((res) => {
      return res
    })
  const statsResponse = await zdkService
    .collectionStatsAggregate({
      collectionAddress: address,
      network: networkInput,
    })
    .then((res) => {
      return res
    })
  return { ...collection, ...statsResponse }
}

const fetchCollections = async (collections: string[]) => {
  try {
    const responses = await Promise.all(
      collections.map((address) => {
        const response = mergeCollectionFetch(address)
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
