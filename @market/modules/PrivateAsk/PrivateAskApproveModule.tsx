import React, { useEffect } from 'react'

import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { PrintError } from '@shared'
import { Zorb } from '@zora-brand'
import { Stack } from '@zoralabs/zord'

import { HeadingDescription } from './HeadingDescription'
import { LearnMoreButton } from './LearnMoreButton'
import { PrivateAskCheckApprovalSpinner } from './PrivateAskCheckApprovalSpinner'
import { CommonPrivateAskComponentProps } from './PrivateAskFlow'
import { usePrivateAskModuleApproval } from './hooks/usePrivateAskModuleApproval'

interface PrivateAskApproveModuleProps extends CommonPrivateAskComponentProps {}

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
    isApproved && onNext && onNext()
  }, [isApproved, onNext])

  return isAwaitingApprovalCheck ? (
    <PrivateAskCheckApprovalSpinner text="Checking Private Ask Module Approval..." />
  ) : (
    <Stack gap="x8">
      <Stack gap="x8" align="center">
        <Zorb size={52} />
        <HeadingDescription
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

        <LearnMoreButton>Learn more about approvals</LearnMoreButton>
      </Stack>
    </Stack>
  )
}
