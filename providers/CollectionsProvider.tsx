import { AggregateAttribute } from 'types/zora.api.generated'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

const CollectionsContext = createContext<{
  currentCollection: string
  setCurrentCollection: Dispatch<SetStateAction<string>>
  currentCollectionCount: string | undefined
  setCurrentCollectionCount: Dispatch<SetStateAction<string | undefined>>
  filterPropertiesList: AggregateAttribute[]
  setFilterPropertiesList: Dispatch<SetStateAction<AggregateAttribute[]>>
}>({
  currentCollection: 'Browse...',
  setCurrentCollection: () => {},
  currentCollectionCount: undefined,
  setCurrentCollectionCount: () => {},
  filterPropertiesList: [],
  setFilterPropertiesList: () => {},
})

type CollectionsProps = {
  children?: ReactNode
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children }: CollectionsProps) {
  const [currentCollection, setCurrentCollection] = useState<string>('Browse...')
  const [filterPropertiesList, setFilterPropertiesList] = useState<
    AggregateAttribute[] | []
  >([])
  const [currentCollectionCount, setCurrentCollectionCount] = useState<
    string | undefined
  >(undefined)

  return (
    <CollectionsContext.Provider
      value={{
        currentCollection,
        setCurrentCollection,
        currentCollectionCount,
        setCurrentCollectionCount,
        filterPropertiesList,
        setFilterPropertiesList,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}
