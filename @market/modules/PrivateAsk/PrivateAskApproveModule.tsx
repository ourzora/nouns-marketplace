import { PrintError } from '@shared'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import React, { useEffect, useMemo } from 'react'
import { TransactionSubmitButton } from '@market/components/'
import { usePrivateAskModuleApproval } from './hooks/usePrivateAskModuleApproval'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'
import { PrivateAskCheckApprovalSpinner, LearnMoreButton } from './'

interface PrivateAskApproveModuleProps extends CommonPrivateAskComponentProps {}

export function PrivateAskApproveModule({
  onNext,
  ...props
}: PrivateAskApproveModuleProps) {
  const { isApproved, error, txStatus, txInProgress, handleApproveModule } =
    usePrivateAskModuleApproval()
  const awaitApprovalCheck = useMemo(() => isApproved === undefined, [isApproved])

  useEffect(() => {
    isApproved && onNext && onNext()
  }, [isApproved, onNext])

  return awaitApprovalCheck ? (
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
