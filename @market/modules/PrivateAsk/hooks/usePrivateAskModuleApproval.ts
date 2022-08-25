import { useZoraV3ModuleApproval } from '@market/hooks'
import { useContractTransaction, useToggleOnce } from '@shared'
import { useCallback, useState } from 'react'
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
  //   const [initialized, toggleInitialized] = useToggleOnce(false)

  // console.log('in PrivateAskApproveModule...')

  // @BJ TODO: move into an Approval hook?
  const handleApproveModule = useCallback(async () => {
    // @TODO: Add approve module logic
    console.log('in handleApproveModule()...')
    console.log('APPROVED?', isApproved)

    try {
      setError('')
      const promise = approve()
      await handleTx(promise)
      await mutate()
    } catch (e: any) {
      setError(e.message)
      await mutate()
    }
  }, [approve, isApproved, handleTx, mutate])

  return {
    txStatus,
    txInProgress,
    isApproved,
    error,
    handleApproveModule,
  }
}
