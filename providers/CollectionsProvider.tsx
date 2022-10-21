import { collectionAddresses, daoAddresses } from 'constants/collection-addresses'

import { CollectionsData } from 'hooks'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

const CollectionsContext = createContext<{
  collections: CollectionsData[]
  daos: CollectionsData[]
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
  currentCollection: 'Browse...',
  setCurrentCollection: () => {},
  currentCollectionCount: undefined,
  setCurrentCollectionCount: () => {},
})

type CollectionsProps = {
  children?: ReactNode
  collections: CollectionsData[] | undefined
  daos: CollectionsData[] | undefined
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children, collections, daos }: CollectionsProps) {
  const [currentCollection, setCurrentCollection] = useState<string>('Browse...')
  const [currentCollectionCount, setCurrentCollectionCount] = useState<
    string | undefined
  >(undefined)

  return (
    <CollectionsContext.Provider
      value={{
        collections: collections ?? [],
        collectionAmount: collectionAddresses.length,
        daos: daos ?? [],
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
