import { Collection } from '@zoralabs/zdk-alpha/dist/queries/queries-sdk'
import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { collectionAddresses } from 'utils/collection-addresses'
import { useCollections } from 'hooks/zdk/useCollections'

const CollectionsContext = createContext<{
  collections: Collection[] | []
}>({
  collections: [],
})

type CollectionsProps = {
  children?: ReactNode
}

export function useCollectionsContext() {
  return useContext(CollectionsContext)
}

export function CollectionsProvider({ children }: CollectionsProps) {
  const { collections } = useCollections(collectionAddresses)

  return (
    <CollectionsContext.Provider
      value={{
        collections: collections ? collections : [],
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}
