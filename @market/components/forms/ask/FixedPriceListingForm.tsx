import React, { useCallback, useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ContractTransaction } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { Flex, Label } from '@zoralabs/zord'

import { TransactionSubmitButton, PrintError, BigNumberField } from '@market/components'

import { useAuth, useContractContext, useContractTransaction } from '@market/hooks'

import {
  Currency,
  ETH_CURRENCY_SHIM,
  INITIAL_VALUE_ZERO,
  fixedPriceSchema,
} from '@market/utils'

type FixedPriceListingFormProps = {
  tokenId: string
  tokenAddress: string
  isUpdate?: boolean
  onConfirmation: (txHash: string, amount: string, currencyAddress: string) => void
}

type FixedPriceListingFormState = {
  currency: Currency
  amount: BigNumber
  findersFeeBps: number
}

const initialValues: FixedPriceListingFormState = {
  currency: ETH_CURRENCY_SHIM,
  amount: BigNumber.from(0),
  findersFeeBps: 0,
}

// TODO - add royalty

export function FixedPriceListingForm({
  tokenId,
  tokenAddress,
  onConfirmation,
  isUpdate = false,
}: FixedPriceListingFormProps) {
  const { address } = useAuth()
  const [error, setError] = useState<string>()
  const { AsksV11 } = useContractContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()

  const handleOnSubmit = useCallback(
    async (
      values: FixedPriceListingFormState,
      { setSubmitting }: FormikHelpers<FixedPriceListingFormState>
    ) => {
      try {
        if (!address || !AsksV11) {
          throw new Error('V3AskContract is not ready, please try again.')
        }
        setSubmitting(true)
        const promise: Promise<ContractTransaction> = isUpdate
          ? AsksV11.setAskPrice(tokenAddress, tokenId, values.amount, values.currency.id)
          : AsksV11.createAsk(
              tokenAddress,
              tokenId,
              values.amount,
              values.currency.id,
              address,
              values.findersFeeBps * 100
            )
        const tx = await handleTx(promise)
        onConfirmation(tx.hash, values.amount.toString(), values.currency.id)
      } catch (err: any) {
        setError(err?.message || "There's been an error, please try again.")
      } finally {
        setSubmitting(false)
      }
    },
    [AsksV11, address, handleTx, isUpdate, onConfirmation, tokenAddress, tokenId]
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={fixedPriceSchema}
      onSubmit={handleOnSubmit}
      isInitialValid={false}
    >
      {({ values, isValid }) => (
        <Form>
          <Flex justify="space-between">
            <Label color="secondary" size="lg">
              NFT Price {`(ETH)`}:
            </Label>
          </Flex>
          <Flex py="x2">
            <BigNumberField
              type="text"
              pattern="[0-9.]*"
              name="amount"
              min={'0'}
              placeholder={INITIAL_VALUE_ZERO}
              decimals={values.currency.decimals}
            />
          </Flex>
          {error && <PrintError errorMessage={error} />}
          <TransactionSubmitButton
            txStatus={txStatus}
            txInProgress={txInProgress}
            disabled={!isValid}
          >
            List
          </TransactionSubmitButton>
        </Form>
      )}
    </Formik>
  )
}
