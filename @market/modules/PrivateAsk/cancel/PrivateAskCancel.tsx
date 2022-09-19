import React, { useEffect } from 'react'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'

import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'
import { HeadlineDescription } from '../HeadlineDescription'
import { PrintError } from '@shared'

interface PrivateAskCancelProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCancel({ onNext, ...props }: PrivateAskCancelProps) {
  const { isSubmitting, cancelAsk, txStatus, txInProgress, txError, finalizedTx } =
    usePrivateAskTransaction({ nft: props.nft })
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Stack gap="x6" {...props}>
      <Stack gap="x4">
        <HeadlineDescription
          heading="Cancel Private Listing"
          description="This action is irreversible, but you can list the NFT for sale again."
        />

        {txError && (
          <PrintError errorMessage={txError} />
          // <Paragraph size="xs" color="negative">
          //   {txError}
          // </Paragraph>
        )}
      </Stack>
      <TransactionSubmitButton
        type="submit"
        txStatus={txStatus}
        txInProgress={txInProgress}
        onClick={cancelAsk}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Cancel Listing
      </TransactionSubmitButton>
    </Stack>
  )
}
