import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { NFTObject } from '@zoralabs/nft-hooks'

export function useIsOwner(nftData: NFTObject) {
  const { nft } = nftData
  const { data: account } = useAccount()

  const isOwner = useMemo(
    () => account?.address?.toLowerCase() === nft?.owner?.address.toLowerCase(),
    [account?.address, nft?.owner]
  )

  return { isOwner }
}
