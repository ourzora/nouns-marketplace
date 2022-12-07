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
}>({
  currentCollection: 'Browse...',
  setCurrentCollection: () => {},
  currentCollectionCount: undefined,
  setCurrentCollectionCount: () => {},
})

type CollectionsProps = {
  children?: ReactNode
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children }: CollectionsProps) {
  const [currentCollection, setCurrentCollection] = useState<string>('Browse...')
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
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}
