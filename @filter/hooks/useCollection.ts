import useSWR from 'swr'
import { zdk } from '@filter/utils/zdk'

export function useCollection(address: string) {
  return useSWR(['collectionInfo', address], (_, address) =>
    zdk.collection({
      address,
    })
  )
}
