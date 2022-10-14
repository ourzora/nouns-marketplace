import { zdk } from '@shared/utils/zdk'
import useSWR from 'swr'

export function useCollection(address: string) {
  return useSWR([`collectionInfo-${address}`], (_) =>
    zdk.collection({
      address,
    })
  )
}
