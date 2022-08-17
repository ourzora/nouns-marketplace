import { NFTObject } from '@zoralabs/nft-hooks'
import {
  Button,
  Eyebrow,
  Flex,
  Heading,
  Icon,
  Label,
  Paragraph,
  Stack,
  StackProps,
  Tag,
  Well,
} from '@zoralabs/zord'
import { MotionStack, useContractTransaction } from '@shared'
import React, { useCallback, useState } from 'react'

import { LearnMoreButton } from './LearnMoreButton'
import * as styles from './PrivateAskListForSale.css'
import { TransactionSubmitButton } from '../TransactionSubmitButton'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { ContractTransaction } from 'ethers'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'
import { useContractContext } from '@market/providers'

interface PrivateAskCancelProps extends StackProps {
  nft: NFTObject
  onNext: () => void
}

interface Values {
  buyeraddress?: string
  amount?: string
}

export function PrivateAskCancel({ onNext, ...props }: PrivateAskCancelProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [txError, setTxError] = useState<string>('')
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { nft } = props.nft

  const handleSubmit = useCallback(async () => {
    try {
      if (!nft || !PrivateAsks) {
        throw new Error('V3AskContract is not ready, please try again.')
      }

      setSubmitting(true)
      console.log('SUBMITTED!')
      const promise: Promise<ContractTransaction> = PrivateAsks.cancelAsk(
        nft?.contract.address!,
        nft?.tokenId!
      )
      const tx = await handleTx(promise)
      console.log('promise', promise)
      console.log('tx.hash', tx.hash)

      tx && onNext && onNext()
    } catch (err: any) {
      setTxError(err?.message || "There's been an error, please try again.")
    } finally {
      console.log('FINALLY')
      setSubmitting(false)
    }
  }, [PrivateAsks, handleTx, nft, onNext])

  return (
    <MotionStack
      gap="x5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <Heading size="xs">Cancel Private Sale</Heading>

      <Stack gap="x5">
        <Paragraph>
          Cancel the private sale. This action can not be reversed, but you will be able
          to list the NFT for sale again.
        </Paragraph>

        {txError && (
          <Paragraph size="xs" color="destructive">
            {txError}
          </Paragraph>
        )}

        <TransactionSubmitButton
          type="submit"
          txStatus={txStatus}
          txInProgress={txInProgress}
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Cancel Private Sale
        </TransactionSubmitButton>
      </Stack>
    </MotionStack>
  )
}
