import { ContractTransaction } from '@ethersproject/contracts'
import { useAccount } from 'wagmi'
import { useContractContext } from './useContractContext'
import useSWR from 'swr'

export function useZoraV3ModuleApproval(address: string) {
  const { address: account } = useAccount()
  const { ModuleManager, isReadOnly } = useContractContext()

  const { data: approved, ...rest } = useSWR(
    account ? ['isApprovedForAll', account as string, address] : null,
    (_, userAddress, spender) => ModuleManager.isModuleApproved(userAddress, spender)
  )

  function approve(): Promise<ContractTransaction> {
    if (!ModuleManager || isReadOnly) {
      throw new Error('No connected contract instance || spender address')
    }

    return ModuleManager.setApprovalForModule(address, true)
  }

  return { loading: typeof approved === 'undefined', approved, approve, ...rest }
}
