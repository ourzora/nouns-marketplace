import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Collection, AggregateStat } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { zdkService } from 'utils/zdk'
import useSWR from 'swr'
import { collectionAddresses } from 'utils/collection-addresses'
import { useEffect } from 'react'

const networkInput = {
  chain: Chain.Mainnet,
  network: Network.Ethereum,
}

export type CollectionsData = {
  collectionInfo: Collection
  aggregateStat: AggregateStat
}

const mergeCollectionFetch = async (address: string) => {
  const collection = await zdkService
    .collection({
      address: address,
      includeFullDetails: false,
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
  return { collectionInfo: collection, ...statsResponse }
}

const fetchCollections = async (collections: string[]) => {
  try {
    const responses = await Promise.all(
      collections.map((address) => {
        const response = mergeCollectionFetch(address)
        return response
      })
    )
    // console.log(responses)
    return {
      data: responses,
    }
  } catch (error) {
    return { data: undefined, error }
  }
}

export function useCollections() {
  const { data, error } = useSWR([collectionAddresses], fetchCollections)
  useEffect(() => {
    // console.log('collections', data, error)
  }, [data, error])

  return {
    collections: data?.data,
    error,
  }
}
