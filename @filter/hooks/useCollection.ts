import { zdk } from '@shared/utils/zdk'
import useSWR from 'swr'

export function useCollection(address: string) {
  return useSWR(['collectionInfo', address], (_, address) =>
    zdk.collection({
      address,
    })
  )
}
