import { useEffect, useState } from 'react'
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useProvider,
  useSigner,
  useBalance,
  useEnsName,
  useEnsAvatar,
} from 'wagmi'
import { shortenAddress, NETWORK_CHAIN_ID } from '@shared'

export function useAuth() {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { address, isConnecting } = useAccount()
  const { data: ensName } = useEnsName({
    address: address,
  })
  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
  })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const [incorrectChain, setIncorrectChain] = useState(false)
  const { data: balance } = useBalance({ addressOrName: address })

  useEffect(() => {
    setIncorrectChain(chain ? chain.id !== NETWORK_CHAIN_ID : false)
  }, [chain])

  return {
    provider,
    incorrectChain,
    signer,
    address: address,
    ensName: ensName || shortenAddress(address),
    ensAvatar: ensAvatar,
    displayName: ensName || shortenAddress(address),
    balance: balance,
    loading: isConnecting,
    logout: disconnect,
  }
}
