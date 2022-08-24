import { PrintError, useToggleOnce } from '@shared'
import { Heading, Paragraph, Spinner, Stack } from '@zoralabs/zord'
import React, { useEffect } from 'react'
import { TransactionSubmitButton } from '@market/components/'
import { usePrivateAskModuleApproval } from './hooks/usePrivateAskModuleApproval'
import { LearnMoreButton } from './LearnMoreButton'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'

interface PrivateAskApproveModuleProps extends CommonPrivateAskComponentProps {}

export function PrivateAskApproveModule({
  onNext,
  ...props
}: PrivateAskApproveModuleProps) {
  const [initialized, toggleInitialized] = useToggleOnce(false)
  const { isApproved, error, txStatus, txInProgress, handleApproveModule } =
    usePrivateAskModuleApproval()

  useEffect(() => {
    isApproved ? onNext && onNext() : toggleInitialized()
  }, [isApproved, onNext, toggleInitialized])

  return !initialized ? (
    <Spinner />
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
