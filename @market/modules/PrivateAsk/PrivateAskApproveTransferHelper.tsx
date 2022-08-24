import { TransactionSubmitButton } from '@market/components'
import { PrintError, useToggleOnce } from '@shared'
import { Heading, Paragraph, Spinner, Stack } from '@zoralabs/zord'
import React, { useEffect } from 'react'
import { usePrivateAskTransferHelperApproval } from './hooks'

import { LearnMoreButton } from './LearnMoreButton'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'

interface PrivateAskApproveTransferHelperProps extends CommonPrivateAskComponentProps {}

export function PrivateAskApproveTransferHelper({
  onNext,
  nft,
  ...props
}: PrivateAskApproveTransferHelperProps) {
  const [initialized, toggleInitialized] = useToggleOnce(false)
  const { txStatus, txInProgress, isApproved, error, handleApproveERC721ForSpender } =
    usePrivateAskTransferHelperApproval({ contractAddress: nft.nft?.contract.address })

  useEffect(() => {
    isApproved ? onNext && onNext() : toggleInitialized()
  }, [isApproved, onNext, toggleInitialized])

  return !initialized ? (
    <Spinner />
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
