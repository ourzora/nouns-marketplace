import { zdkService } from 'utils/zdk'
import useSWR from 'swr'
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk'

const networkInput = {
  chain: Chain.Mainnet,
  network: Network.Ethereum,
}

export function useAggregate(collectionAddress: string) {
  const { data, error } = useSWR(
    ['collectionInfo', collectionAddress],
    (_, collectionAddress) =>
      zdkService.collectionStatsAggregate({
        collectionAddress: collectionAddress,
        network: networkInput,
      })
  )

  return {
    aggregate: data,
    error,
  }
}
