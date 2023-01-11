import React, { useEffect } from 'react'

import { TransactionSubmitButton } from '@market/components'
import { PrintError } from '@shared'
import { Zorb } from '@zora-brand'
import { Stack } from '@zord'

import { V3AskCheckApprovalSpinner } from './V3AskCheckApprovalSpinner'
import { CommonV3AskComponentProps } from './V3AskFlow'
import { V3AskHeadingDescription } from './V3AskHeadingDescription'
import { V3AskLearnMoreButton } from './V3AskLearnMoreButton'
import { usePrivateAskModuleApproval } from './hooks/usePrivateAskModuleApproval'

interface PrivateAskApproveModuleProps extends CommonV3AskComponentProps {}

export function PrivateAskApproveModule({
  onNext,
  ...props
}: PrivateAskApproveModuleProps) {
  const {
    isApproved,
    isAwaitingApprovalCheck,
    error,
    txStatus,
    txInProgress,
    handleApproveModule,
  } = usePrivateAskModuleApproval()

  useEffect(() => {
    isApproved && onNext!()
  }, [isApproved, onNext])

  return isAwaitingApprovalCheck ? (
    <V3AskCheckApprovalSpinner text="Checking Private Ask Module Approval..." />
  ) : (
    <Stack gap="x8">
      <Stack gap="x8" align="center">
        <Zorb size={52} />
        <V3AskHeadingDescription
          heading="Approve Module"
          description="The Private Asks Module allows a seller to initiate a private ERC-721 NFT sale to a specific buyer, and for the buyer to complete the purchase."
        />
        {error && <PrintError errorMessage={error} />}
      </Stack>
      <Stack gap="x4">
        <TransactionSubmitButton
          txInProgress={txInProgress}
          txStatus={txStatus}
          onClick={handleApproveModule}
        >
          Approve module
        </TransactionSubmitButton>

        <V3AskLearnMoreButton>Learn more about approvals</V3AskLearnMoreButton>
      </Stack>
    </Stack>
  )
}
