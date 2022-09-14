import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import React, { useEffect } from 'react'
import { PrintError } from '@shared'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskModuleApproval } from './hooks/usePrivateAskModuleApproval'
import { CommonPrivateAskComponentProps } from './PrivateAskFlow'
import { PrivateAskCheckApprovalSpinner } from './PrivateAskCheckApprovalSpinner'
import { LearnMoreButton } from './LearnMoreButton'
import { Zorb } from '@zora-brand'

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
        <Heading as="h2" size="md">
          Approve Module
        </Heading>
        <Paragraph size="sm" color="text4" align="center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi doloribus itaque
          fugiat hic eveniet laborum, optio fuga dicta. Eaque corrupti tempora voluptas
          qui error, totam dolores non repellendus asperiores obcaecati?
        </Paragraph>
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

        <LearnMoreButton
          href="https://support.zora.co/en/articles/5878598-what-s-an-approval"
          target="_blank"
        >
          Learn more about selling on Zora
        </LearnMoreButton>
      </Stack>
    </Stack>
  )
}
