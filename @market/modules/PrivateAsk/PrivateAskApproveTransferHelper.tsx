import React, { useEffect } from 'react'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransferHelperApproval } from './hooks/usePrivateAskTransferHelperApproval'

import { LearnMoreButton } from './LearnMoreButton'
import { PrivateAskCheckApprovalSpinner } from './PrivateAskCheckApprovalSpinner'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'

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
    <PrivateAskCheckApprovalSpinner text="Checking Zora Transfer Helper Approval" />
  ) : (
    <Stack gap="x6">
      <Stack gap="x2">
        <Heading size="xs">Approve Transfer Helper</Heading>
        <Paragraph size="sm">
          To list your NFTs on ZORA, you first need to approve permission for ZORA to use
          them.
        </Paragraph>
        {error && <PrintError errorMessage={error} />}
      </Stack>

      <TransactionSubmitButton
        txInProgress={txInProgress}
        txStatus={txStatus}
        onClick={handleApproveERC721ForSpender}
      >
        Approve your NFTs
      </TransactionSubmitButton>

      <LearnMoreButton
        href="https://support.zora.co/en/articles/5878598-what-s-an-approval"
        target="_blank"
      >
        Learn more about selling on Zora
      </LearnMoreButton>
    </Stack>
  )
}
