import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { collectionAddresses, daoAddresses } from 'constants/collection-addresses'
import { CollectionsData } from 'hooks'

const CollectionsContext = createContext<{
  collections: CollectionsData[] | []
  daos: any[]
  collectionAmount: number
  daosAmount: number
  currentCollection: string
  setCurrentCollection: Dispatch<SetStateAction<string>>
  currentCollectionCount: string | undefined
  setCurrentCollectionCount: Dispatch<SetStateAction<string | undefined>>
}>({
  collections: [],
  daos: [],
  collectionAmount: collectionAddresses.length,
  daosAmount: daoAddresses.length,
  currentCollection: 'Explore...',
  setCurrentCollection: () => {},
  currentCollectionCount: undefined,
  setCurrentCollectionCount: () => {},
})

type CollectionsProps = {
  children?: ReactNode
  collections: CollectionsData[] | undefined
  daos: any[] | undefined
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children, collections, daos }: CollectionsProps) {
  const [currentCollection, setCurrentCollection] = useState<string>('Explore...')
  const [currentCollectionCount, setCurrentCollectionCount] = useState<
    string | undefined
  >(undefined)

  return (
    <CollectionsContext.Provider
      value={{
        /* @ts-ignore */
        collections: collections ? collections : [],
        collectionAmount: collectionAddresses.length,
        daos: daos ? daos : [],
        daosAmount: daoAddresses.length,
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
