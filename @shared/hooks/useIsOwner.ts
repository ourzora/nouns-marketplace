import { useAccount } from 'wagmi'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { isAddressMatch } from '@shared/utils'

export function useIsOwner(token: TypeSafeToken) {
  const { address } = useAccount()

  const isOwner = useMemo(
    () => isAddressMatch(address, token.owner),
    [address, token.owner]
  )

  return { isOwner }
}
