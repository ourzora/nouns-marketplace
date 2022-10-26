import { useMemo } from 'react'

import { useNounsDaos } from './useNounsDaos'

export function useAddressesOfCollectionsOfDaos() {
  const { daos } = useNounsDaos()
  return useMemo(() => daos.map((d) => d.collectionAddress), [daos])
}
