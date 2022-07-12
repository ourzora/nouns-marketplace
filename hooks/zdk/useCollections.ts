import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { zdk } from '@shared/utils/zdk'
import { useEffect, useState } from 'react'
import { collectionAddresses } from 'constants/collection-addresses'

export type CollectionsData = Collection

export function useCollections() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(undefined)
  const [collections, setCollections] = useState<Collection[] | undefined>(undefined)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await Promise.all(
          collectionAddresses.map((address) => {
            const response = zdk
              .collection({
                address: address,
                includeFullDetails: false,
              })
              .then((res) => {
                return res
              })
            return response
          })
        )
        setCollections(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  return {
    loading,
    error,
    collections,
  }
}
