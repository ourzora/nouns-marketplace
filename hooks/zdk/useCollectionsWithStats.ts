import { Collection, AggregateStat } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { zdk } from '@shared'
import useSWR from 'swr'
import { collectionAddresses } from 'constants/collection-addresses'
import { useEffect } from 'react'
import { NetworkInput } from 'utils/network'

export type CollectionsData = {
  collectionInfo: Collection
  aggregateStat: AggregateStat
}

const mergeCollectionFetch = async (address: string) => {
  const collection = await zdk
    .collection({
      address: address,
      includeFullDetails: false,
    })
    .then((res) => {
      return res
    })
  const statsResponse = await zdk
    .collectionStatsAggregate({
      collectionAddress: address,
      network: NetworkInput,
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
    return {
      data: responses,
    }
  } catch (error) {
    return { data: undefined, error }
  }
}

export function useCollections() {
  const { data, error } = useSWR([collectionAddresses], fetchCollections)
  useEffect(() => {}, [data, error])

  return {
    collections: data?.data,
    error,
  }
}
