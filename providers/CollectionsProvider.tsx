import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { collectionAddresses } from 'utils/collection-addresses'
import { CollectionsData } from 'hooks/zdk/useCollections'

const CollectionsContext = createContext<{
  collections: Collection[] | []
  collectionAmount: number
  currentCollection: any | undefined
  setCurrentCollection: (collectionName: string | undefined) => void
}>({
  collections: [],
  collectionAmount: collectionAddresses.length,
  currentCollection: undefined,
  setCurrentCollection: () => {},
})

type CollectionsProps = {
  children?: ReactNode
  collections: CollectionsData[]
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children, collections }: CollectionsProps) {
  const [currentCollection, setCurrentCollection] = useState(undefined)

  const currentCollectionHandler = useCallback((collectionName) => {
    const navCollection = collections?.find(
      (collection) => collection.collectionInfo.name === collectionName
    )
    console.log(navCollection, collections)
    /* @ts-ignore */
    setCurrentCollection(navCollection)
  }, [])

  useEffect(() => {
    console.log(collections)
  }, [collections])

  return (
    <CollectionsContext.Provider
      value={{
        /* @ts-ignore */
        collections: collections ? collections : [],
        collectionAmount: collectionAddresses.length,
        currentCollection,
        setCurrentCollection: currentCollectionHandler,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}
