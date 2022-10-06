import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { NFTObject } from '@zoralabs/nft-hooks'
import { isAddressMatch } from '@shared/utils'

export function useIsOwner(nftObj: NFTObject) {
  const { nft } = nftObj
  const { address } = useAccount()

  const isOwner = useMemo(
    () => isAddressMatch(address, nft?.owner?.address),
    [address, nft?.owner]
  )

  return { isOwner }
}
