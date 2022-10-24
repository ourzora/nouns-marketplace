import { useCallback, useEffect, useState } from 'react'

import { useERC721TokenApproval } from '@market/hooks/useERC721TokenApproval'
import { ERC721_TRANSFER_HELPER_ADDRESS } from '@shared/constants'
import { useContractTransaction } from '@shared/hooks/useContractTransaction'

interface TransferHelperApprovalProps {
  contractAddress?: string
}

export function usePrivateAskTransferHelperApproval({
  contractAddress,
}: TransferHelperApprovalProps) {
  const [isAwaitingApprovalCheck, setIsAwaitingApprovalCheck] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const {
    approved: isApproved,
    loading,
    approve,
    mutate,
  } = useERC721TokenApproval(contractAddress, ERC721_TRANSFER_HELPER_ADDRESS)
  const { txStatus, handleTx, txInProgress } = useContractTransaction()

  useEffect(() => {
    isAwaitingApprovalCheck && loading && setIsAwaitingApprovalCheck(false)
  }, [isAwaitingApprovalCheck, loading])

  const handleApproveERC721ForSpender = useCallback(async () => {
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
    handleApproveERC721ForSpender,
  }
}
