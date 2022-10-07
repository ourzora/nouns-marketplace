import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { NFTObject } from '@zoralabs/nft-hooks'
import { isAddressMatch } from '@shared/utils'

export function useIsOwner(nftObj: NFTObject | undefined) {
  const { address } = useAccount()

  const isOwner = useMemo(
    () => isAddressMatch(address, nftObj?.nft?.owner?.address),
    [address, nftObj?.nft?.owner]
  )

  return { isOwner }
}
