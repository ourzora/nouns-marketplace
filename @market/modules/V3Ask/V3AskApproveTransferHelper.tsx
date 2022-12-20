import React, { useEffect } from 'react'

import { TransactionSubmitButton } from '@market/components'
import { PrintError } from '@shared/components/PrintError'
import { Zorb } from '@zora-brand'
import { Stack } from '@zord'

import { V3AskCheckApprovalSpinner } from './V3AskCheckApprovalSpinner'
import { CommonV3AskComponentProps } from './V3AskFlow'
import { V3AskHeadingDescription } from './V3AskHeadingDescription'
import { V3AskLearnMoreButton } from './V3AskLearnMoreButton'
import { useV3AskTransferHelperApproval } from './hooks/useV3AskTransferHelperApproval'

interface V3AskApproveTransferHelperProps extends CommonV3AskComponentProps {}

export function V3AskApproveTransferHelper({
  onNext,
  nft,
  ...props
}: V3AskApproveTransferHelperProps) {
  const {
    txStatus,
    txInProgress,
    isApproved,
    isAwaitingApprovalCheck,
    error,
    handleApproveERC721ForSpender,
  } = useV3AskTransferHelperApproval({ contractAddress: nft.nft?.contract.address })

  useEffect(() => {
    isApproved && onNext && onNext()
  }, [isApproved, onNext])

  return isAwaitingApprovalCheck ? (
    <V3AskCheckApprovalSpinner text="Checking Zora Transfer Helper Approval..." />
  ) : (
    <Stack gap="x8">
      <Stack gap="x8" align="center">
        <Zorb size={52} />
        <V3AskHeadingDescription
          heading="Approve Transfer Helper"
          description="This contract handles the transferring of ERC-20 and ERC-721 tokens for the ZoraV3 modules."
        />
        {error && <PrintError errorMessage={error} />}
      </Stack>
      <Stack gap="x4">
        <TransactionSubmitButton
          txInProgress={txInProgress}
          txStatus={txStatus}
          onClick={handleApproveERC721ForSpender}
        >
          Approve your NFTs
        </TransactionSubmitButton>

        <V3AskLearnMoreButton>Learn more about approvals</V3AskLearnMoreButton>
      </Stack>
    </Stack>
  )
}
