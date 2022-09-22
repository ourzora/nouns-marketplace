import { useCallback, useMemo, useState } from 'react'
import { useZoraV3ModuleApproval } from '@market/hooks/useZoraV3ModuleApproval'
import { useContractTransaction } from '@shared/hooks/useContractTransaction'
import { usePrivateAskContractContext } from '../providers/PrivateAskContractProvider'

export function usePrivateAskModuleApproval() {
  const { PrivateAsks } = usePrivateAskContractContext()
  const [error, setError] = useState<string>()

  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const {
    approved: isApproved,
    approve,
    mutate,
  } = useZoraV3ModuleApproval(PrivateAsks.address)

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
