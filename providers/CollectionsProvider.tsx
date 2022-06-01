import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { collectionAddresses } from 'utils/collection-addresses'
import { useCollections } from 'hooks/zdk/useCollections'

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
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children }: CollectionsProps) {
  const { collections } = useCollections(collectionAddresses)
  const [currentCollection, setCurrentCollection] = useState(undefined)

  const currentCollectionHandler = useCallback(
    (collectionName) => {
      const navCollection = collections?.find(
        (collection) => collection.name === collectionName || 'Nouns'
      )
      /* @ts-ignore */
      setCurrentCollection(navCollection)
    },
    [currentCollection, collections, setCurrentCollection]
  )

  useEffect(() => {
    const defaultCollection = collections?.find(
      (collection) => collection.name === 'Nouns'
    )
    /* @ts-ignore */
    setCurrentCollection(defaultCollection)
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
