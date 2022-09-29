import { useBlocklist } from '@blocklist'
import { Blocked } from 'components/Blocked'
import { useAccount } from 'wagmi'
import { ReactNode } from 'react'

type BlocklistGuardProps = {
  children: ReactNode
}

export function BlocklistGuard({ children }: BlocklistGuardProps) {
  const { address, isConnecting } = useAccount()
  const blocked = useBlocklist(address)

  if (isConnecting) return null

  return blocked ? <Blocked /> : <>{children}</>
}
