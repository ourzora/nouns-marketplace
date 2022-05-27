import { useUser } from './useUser'
import { useEffect, useState } from 'react'
import { shortenAddress } from '../utils/format'
import { NETWORK_CHAIN_ID } from '../utils/connectors'
import { useAccount, useDisconnect, useNetwork, useProvider, useSigner } from 'wagmi'

export function useAuth() {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { data: account, isLoading } = useAccount()
  const { user } = useUser(account?.address)
  const { disconnect } = useDisconnect()
  const { activeChain, switchNetwork } = useNetwork()
  const [incorrectChain, setIncorrectChain] = useState(false)

  useEffect(() => {
    setIncorrectChain(activeChain ? activeChain.id !== NETWORK_CHAIN_ID : false)
  }, [activeChain])

  return {
    provider,
    incorrectChain,
    switchToCorrectNetwork: () => switchNetwork?.(NETWORK_CHAIN_ID),
    signer,
    user: user?.address ? user : { address: account?.address },
    displayName: user?.displayName || shortenAddress(account?.address),
    ensAvatar: user?.ensAvatar,
    address: user?.address || account?.address || '',
    loading: isLoading,
    logout: disconnect,
  }
}
