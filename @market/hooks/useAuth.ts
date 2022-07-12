import { useUser } from './useUser'
import { useEffect, useState } from 'react'
import { shortenAddress } from '../utils/format'
import { NETWORK_CHAIN_ID } from '../utils/connectors'
import { useAccount, useDisconnect, useNetwork, useProvider, useSigner } from 'wagmi'

export function useAuth() {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { address, isConnecting } = useAccount()
  const { user } = useUser(address)
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const [incorrectChain, setIncorrectChain] = useState(false)

  useEffect(() => {
    setIncorrectChain(chain ? chain.id !== NETWORK_CHAIN_ID : false)
  }, [chain])

  return {
    provider,
    incorrectChain,
    signer,
    user: user?.address ? user : { address: address },
    displayName: user?.displayName || shortenAddress(address),
    ensAvatar: user?.ensAvatar,
    address: user?.address || address || '',
    loading: isConnecting,
    logout: disconnect,
  }
}
