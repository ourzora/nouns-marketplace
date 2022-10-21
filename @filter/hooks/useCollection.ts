import useSWR from 'swr'

import { zdk } from '@shared/utils/zdk'

export function useCollection(address: string) {
  return useSWR([`collectionInfo-${address}`], (_) =>
    zdk.collection({
      address,
    })
  )
}
