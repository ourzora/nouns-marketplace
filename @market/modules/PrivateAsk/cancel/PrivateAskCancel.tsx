import React from 'react'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import { MotionStack, useContractTransaction } from '@shared'

import { CommonPrivateAskComponentProps } from '../PrivateAskModal'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransaction } from '../hooks'

interface PrivateAskCancelProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCancel({ onNext, ...props }: PrivateAskCancelProps) {
  const { txStatus, txInProgress, txError } = useContractTransaction()
  const { isSubmitting, cancelAsk } = usePrivateAskTransaction({
    nft: props.nft,
    onNext,
  })

  return (
    // <MotionStack
    //   gap="x5"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.2 }}
    //   {...props}
    // >
    <Stack gap="x6" {...props}>
      <Stack gap="x2">
        <Heading size="xs">Cancel Private Sale</Heading>
        <Paragraph>
          Cancel the private sale. This action can not be reversed, but you will be able
          to list the NFT for sale again.
        </Paragraph>

        {txError && (
          <Paragraph size="xs" color="destructive">
            {txError}
          </Paragraph>
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
        Cancel Private Sale
      </TransactionSubmitButton>
    </Stack>
    // {/* </MotionStack> */}
  )
}
