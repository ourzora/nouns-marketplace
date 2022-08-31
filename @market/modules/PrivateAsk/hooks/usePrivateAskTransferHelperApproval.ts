import { useCallback, useMemo, useState } from 'react'
import { useERC721TokenApproval } from '@market/hooks/useERC721TokenApproval'
import { useContractTransaction } from '@shared/hooks/useContractTransaction'
import { ERC721_TRANSFER_HELPER_ADDRESS } from '@shared/constants'

interface TransferHelperApprovalProps {
  contractAddress?: string
}

export function usePrivateAskTransferHelperApproval({
  contractAddress,
}: TransferHelperApprovalProps) {
  const [error, setError] = useState<string>()
  const {
    approved: isApproved,
    approve,
    mutate,
  } = useERC721TokenApproval(contractAddress, ERC721_TRANSFER_HELPER_ADDRESS)
  const isAwaitingApprovalCheck = useMemo(() => isApproved === undefined, [isApproved]) // If approval status is not yet available, this lets us show an await state
  const { txStatus, handleTx, txInProgress } = useContractTransaction()

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
