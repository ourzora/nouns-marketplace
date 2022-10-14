import { useAccount } from 'wagmi'

import { Blocked } from 'components'

import { ReactNode } from 'react'

import { useBlocklist } from '@blocklist'

type BlocklistGuardProps = {
  children: ReactNode
}

export function BlocklistGuard({ children }: BlocklistGuardProps) {
  const { address, isConnecting } = useAccount()
  const blocked = useBlocklist(address)

  if (isConnecting) return null

  return blocked ? <Blocked /> : <>{children}</>
}
