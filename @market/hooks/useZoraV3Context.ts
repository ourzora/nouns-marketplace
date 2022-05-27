import { V3ContractContext, V3ContractCtx } from '../providers/V3Provider'
import { useContext } from 'react'

export function useZoraV3Context(): V3ContractContext {
  return useContext(V3ContractCtx)
}
