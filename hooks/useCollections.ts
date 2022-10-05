import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { zdk } from '@shared'
import { useEffect, useState } from 'react'
import { collectionAddresses, daoAddresses } from 'constants/collection-addresses'
import * as Sentry from '@sentry/react'

export type CollectionsData = Collection

export function useCollections() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(undefined)
  const [collections, setCollections] = useState<Collection[] | undefined>(undefined)
  const [daos, setDaos] = useState<Collection[] | undefined>(undefined)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        /* @ts-ignore */
        const data = await zdk.collections({
          where: { collectionAddresses: collectionAddresses },
        })
        setCollections(data?.collections?.nodes)
        setLoading(false)
      } catch (error) {
        setError(error)
        Sentry.captureException(error)
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  useEffect(() => {
    const fetchDaos = async () => {
      try {
        setLoading(true)
        /* @ts-ignore */
        const data = await zdk.collections({
          where: { collectionAddresses: daoAddresses },
        })
        setDaos(data?.collections?.nodes)
        setLoading(false)
      } catch (err) {
        Sentry.captureException(err)
      }
    }
    fetchDaos()
  }, [])

  return {
    loading,
    error,
    collections,
    daos,
  }
}
