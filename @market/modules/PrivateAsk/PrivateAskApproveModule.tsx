import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import React, { useEffect, useMemo } from 'react'
import { PrintError } from '@shared'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskModuleApproval } from './hooks/usePrivateAskModuleApproval'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'
import { PrivateAskCheckApprovalSpinner } from './PrivateAskCheckApprovalSpinner'
import { LearnMoreButton } from './LearnMoreButton'

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
    <PrivateAskCheckApprovalSpinner text="Checking Private Ask Module Approval" />
  ) : (
    <Stack gap="x6">
      <Stack gap="x2">
        <Heading size="xs">Approve Module</Heading>
        <Paragraph size="sm">
          The new Reserve Auction Smart Contract features several improvements as well as
          new features such as:
        </Paragraph>
        {error && <PrintError errorMessage={error} />}
      </Stack>

      <TransactionSubmitButton
        txInProgress={txInProgress}
        txStatus={txStatus}
        onClick={handleApproveModule}
      >
        Approve module
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
