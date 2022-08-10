import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { NFTObject } from '@zoralabs/nft-hooks'

export function useIsOwner(nftData: NFTObject) {
  const { nft } = nftData
  const { address } = useAccount()

  const isOwner = useMemo(
    () => address?.toLowerCase() === nft?.owner?.address.toLowerCase(),
    [address, nft?.owner]
  )

  return { isOwner }
}
