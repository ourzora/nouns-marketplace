import { useAccount } from 'wagmi'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { isAddressMatch } from '@shared/utils'
import { NFTObject } from '@zoralabs/nft-hooks'

export function useIsOwner(token: TypeSafeToken | NFTObject) {
  const { address } = useAccount()

  let o: any = token

  const isOwner = useMemo(
    () => isAddressMatch(address, o.owner ?? o.nft?.owner?.address),
    [address, o]
  )

  return { isOwner }
}
