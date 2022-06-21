import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { collectionAddresses } from 'utils/collection-addresses'
import { CollectionsData } from 'hooks/zdk/useCollections'

const CollectionsContext = createContext<{
  collections: CollectionsData[] | []
  collectionAmount: number
  currentCollection: string
  setCurrentCollection: Dispatch<SetStateAction<string>>
  currentCollectionCount: string | undefined
  setCurrentCollectionCount: Dispatch<SetStateAction<string | undefined>>
}>({
  collections: [],
  collectionAmount: collectionAddresses.length,
  currentCollection: 'Explore Collections...',
  setCurrentCollection: () => {},
  currentCollectionCount: undefined,
  setCurrentCollectionCount: () => {},
})

type CollectionsProps = {
  children?: ReactNode
  collections: CollectionsData[] | undefined
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children, collections }: CollectionsProps) {
  const [currentCollection, setCurrentCollection] = useState<string>(
    'Explore Collections...'
  )
  const [currentCollectionCount, setCurrentCollectionCount] = useState<
    string | undefined
  >(undefined)

  return (
    <CollectionsContext.Provider
      value={{
        /* @ts-ignore */
        collections: collections ? collections : [],
        collectionAmount: collectionAddresses.length,
        currentCollection,
        setCurrentCollection,
        currentCollectionCount,
        setCurrentCollectionCount,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}
