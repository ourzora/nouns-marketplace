import { useEnsAvatar, useEnsName } from 'wagmi'

import { shortenAddress } from '@shared/utils'

export function useEnsData({
  address,
  enableName = true,
  enableAvatar = true,
}: {
  address?: string
  enableName?: boolean
  enableAvatar?: boolean
}) {
  const { data: ensName } = useEnsName({
    address,
    enabled: enableName,
  })

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
    enabled: enableAvatar,
  })

  return {
    ensName,
    ensAvatar,
    displayName: ensName || shortenAddress(address),
  }
}
