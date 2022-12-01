import { useCallback, useMemo, useState } from 'react'

import { useZoraV3ModuleApproval } from '@market/hooks/useZoraV3ModuleApproval'
import { useContractTransaction } from '@shared/hooks/useContractTransaction'

import { useV3AskContractContext } from '../providers/V3AskContractProvider'

export function useV3AskModuleApproval() {
  const { V3Asks } = useV3AskContractContext()
  const [error, setError] = useState<string>()

  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const {
    approved: isApproved,
    approve,
    mutate,
  } = useZoraV3ModuleApproval(V3Asks.address)

  const isAwaitingApprovalCheck = useMemo(() => isApproved === undefined, [isApproved]) // If approval status is not yet available, this lets us show an await state

  // @BJ TODO: move into an Approval hook?
  const handleApproveModule = useCallback(async () => {
    try {
      setError('')
      const promise = approve()
      await handleTx(promise)
      await mutate()
    } catch (e: any) {
      setError(e.message)
      await mutate()
    }
  }, [approve, handleTx, mutate])

  return {
    txStatus,
    txInProgress,
    isApproved,
    isAwaitingApprovalCheck,
    error,
    handleApproveModule,
  }
}
