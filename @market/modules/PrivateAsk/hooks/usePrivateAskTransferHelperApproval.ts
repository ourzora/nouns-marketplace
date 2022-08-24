import { useERC721TokenApproval, useZoraV3ModuleApproval } from '@market/hooks'
import { useContractContext } from '@market/providers'
import {
  ERC721_TRANSFER_HELPER_ADDRESS,
  useContractTransaction,
  useToggleOnce,
} from '@shared'
// import { Button, Heading, Paragraph, Spinner, Stack } from '@zoralabs/zord'
import { useCallback, useState } from 'react'

// import { LearnMoreButton } from './LearnMoreButton'
// import { CommonPrivateAskComponentProps } from './PrivateAskModal'

// interface PrivateAskApproveModuleProps extends CommonPrivateAskComponentProps {}

interface TransferHelperApprovalProps {
  contractAddress?: string
}

export function usePrivateAskTransferHelperApproval({
  contractAddress,
}: // spenderAddress
TransferHelperApprovalProps) {
  const [error, setError] = useState<string>()
  // const { approved: transferHelper } = useERC721TokenApproval(
  //   tokenAddress,
  //   ERC721_TRANSFER_HELPER_ADDRESS
  // )
  const {
    approved: isApproved,
    approve,
    mutate,
  } = useERC721TokenApproval(
    contractAddress,
    ERC721_TRANSFER_HELPER_ADDRESS
    // spenderAddress
  )
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
    error,
    handleApproveERC721ForSpender,
  }
}
