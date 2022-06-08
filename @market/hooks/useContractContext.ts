import { ContractContext, ContractCtx } from '@market/providers/ContractProvider'
import { useContext } from 'react'

export function useContractContext(): ContractContext {
  return useContext(ContractCtx)
}
