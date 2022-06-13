import { FilterStore, initialFilterStore, useFilterStore } from './filterStore'
import { ReactNode, createContext, useContext } from 'react'

const CollectionFilterContext = createContext<{
  filterStore: FilterStore
}>({
  filterStore: initialFilterStore,
})

type CollectionFilterProviderProps = {
  children?: ReactNode
}

export function useCollectionFilters() {
  return useContext(CollectionFilterContext)
}

export function CollectionFilterProvider({ children }: CollectionFilterProviderProps) {
  const filterStore = useFilterStore()

  return (
    <CollectionFilterContext.Provider value={{ filterStore }}>
      {children}
    </CollectionFilterContext.Provider>
  )
}
