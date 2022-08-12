import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { NFTObject } from '@zoralabs/nft-hooks'
import { isAddressMatch } from '@shared/utils'

export function useIsOwner(nftData: NFTObject) {
  const { nft } = nftData
  const { address } = useAccount()

  const isOwner = useMemo(
    () => isAddressMatch(address, nft?.owner?.address),
    [address, nft?.owner]
  )

  return { isOwner }
}
