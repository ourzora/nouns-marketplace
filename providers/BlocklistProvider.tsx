import { useBlocklist } from '@blocklist'
import { Blocked } from 'components/blocked'
import { useAccount } from 'wagmi'
import { ReactNode } from 'react'

type BlocklistGuardProps = {
  children: ReactNode
}

export function BlocklisGuard({ children }: BlocklistGuardProps) {
  const { address, isConnecting } = useAccount()
  const blocked = useBlocklist(address)

  if (isConnecting) return null

  return blocked ? <Blocked /> : <>{children}</>
}
