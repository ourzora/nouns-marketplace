import { NetworkInput } from 'utils/network'

import useSWR from 'swr'

import { useMemo } from 'react'

import { zdk } from '@shared'

export function useFirstTokenID(collectionAddress: string) {
  const { data: tokenData, error: firstTokenDataError } = useSWR(
    [`firstTokenFor-${collectionAddress}`, collectionAddress],
    (_, collectionAddress) =>
      zdk.token({
        token: {
          address: collectionAddress,
          tokenId: '0',
        },
        network: NetworkInput,
      })
  )

  const firstTokenID = useMemo(
    () => (tokenData?.token?.token.tokenId === '0' ? 0 : 1),
    [tokenData?.token?.token.tokenId]
  )
  const isFirstTokenIDZero = firstTokenID === 0

  return {
    firstTokenID,
    isFirstTokenIDZero,
    error: firstTokenDataError,
  }
}
