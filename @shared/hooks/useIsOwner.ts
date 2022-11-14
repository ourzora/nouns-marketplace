import { useAccount } from 'wagmi'

import { useMemo } from 'react'

import { isAddressMatch } from '@shared/utils'
import { NFTObject } from '@zoralabs/nft-hooks'

export function useIsOwner(nftObj: NFTObject | undefined) {
  const { address } = useAccount()

  const isOwner = useMemo(
    () => isAddressMatch(address, nftObj?.nft?.owner?.address),
    [address, nftObj?.nft?.owner]
  )

  return { isOwner }
}
