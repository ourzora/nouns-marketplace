import React, { useEffect } from 'react'
import { Stack } from '@zoralabs/zord'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransferHelperApproval } from './hooks/usePrivateAskTransferHelperApproval'

import { LearnMoreButton } from './LearnMoreButton'
import { PrivateAskCheckApprovalSpinner } from './PrivateAskCheckApprovalSpinner'
import { CommonPrivateAskComponentProps } from './PrivateAskFlow'
import { PrintError } from '@shared/components/PrintError'
import { Zorb } from '@zora-brand'
import { HeadingDescription } from './HeadingDescription'

interface PrivateAskApproveTransferHelperProps extends CommonPrivateAskComponentProps {}

export function PrivateAskApproveTransferHelper({
  onNext,
  nft,
  ...props
}: PrivateAskApproveTransferHelperProps) {
  const {
    txStatus,
    txInProgress,
    isApproved,
    isAwaitingApprovalCheck,
    error,
    handleApproveERC721ForSpender,
  } = usePrivateAskTransferHelperApproval({ contractAddress: nft.nft?.contract.address })

  useEffect(() => {
    isApproved && onNext && onNext()
  }, [isApproved, onNext])

  return isAwaitingApprovalCheck ? (
    <PrivateAskCheckApprovalSpinner text="Checking Zora Transfer Helper Approval..." />
  ) : (
    <Stack gap="x8">
      <Stack gap="x8" align="center">
        <Zorb size={52} />
        <HeadingDescription
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

        <LearnMoreButton>Learn more about approvals</LearnMoreButton>
      </Stack>
    </Stack>
  )
}
