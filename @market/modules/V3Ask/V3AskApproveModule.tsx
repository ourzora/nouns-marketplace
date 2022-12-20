import React, { useEffect } from 'react'

import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { PrintError } from '@shared'
import { Zorb } from '@zora-brand'
import { Stack } from '@zord'

import { V3AskCheckApprovalSpinner } from './V3AskCheckApprovalSpinner'
import { CommonV3AskComponentProps } from './V3AskFlow'
import { V3AskHeadingDescription } from './V3AskHeadingDescription'
import { V3AskLearnMoreButton } from './V3AskLearnMoreButton'
import { useV3AskModuleApproval } from './hooks/useV3AskModuleApproval'

interface V3AskApproveModuleProps extends CommonV3AskComponentProps {}

export function V3AskApproveModule({ onNext, ...props }: V3AskApproveModuleProps) {
  const {
    isApproved,
    isAwaitingApprovalCheck,
    error,
    txStatus,
    txInProgress,
    handleApproveModule,
  } = useV3AskModuleApproval()

  useEffect(() => {
    isApproved && onNext && onNext()
  }, [isApproved, onNext])

  return isAwaitingApprovalCheck ? (
    <V3AskCheckApprovalSpinner text="Checking V3 Ask Module Approval..." />
  ) : (
    <Stack gap="x8">
      <Stack gap="x8" align="center">
        <Zorb size={52} />
        <V3AskHeadingDescription
          heading="Approve Module"
          description="The V3 Asks Module allows a seller to initiate a private ERC-721 NFT sale, or for a buyer to complete the purchase."
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
