import React, { useCallback, useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ContractTransaction } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { Flex, Label, Box, BoxProps } from '@zoralabs/zord'

import { TransactionSubmitButton, PrintError, BigNumberField } from '@market/components'

import { useAuth, useContractContext, useContractTransaction } from '@market/hooks'

import { Currency, ETH_CURRENCY_SHIM, INITIAL_VALUE_ZERO } from '@market/utils'

interface NounsBidFormProps extends BoxProps {
  tokenId: string
  tokenAddress: string
  isUpdate?: boolean
  onConfirmation: (txHash: string, amount: string, currencyAddress: string) => void
}

type NounsBidFormState = {
  currency: Currency
  amount: BigNumber
}

const initialValues: NounsBidFormState = {
  currency: ETH_CURRENCY_SHIM,
  amount: BigNumber.from(0),
}

// TODO - add royalty

export function NounsBidForm({
  tokenId,
  tokenAddress,
  onConfirmation,
  isUpdate = false,
  ...props
}: NounsBidFormProps) {
  const { address } = useAuth()
  const [error, setError] = useState<string>()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()

  const handleOnSubmit = useCallback(
    async (
      values: NounsBidFormState,
      { setSubmitting }: FormikHelpers<NounsBidFormState>
    ) => {
      try {
        console.log('submit')
      } catch (err: any) {
        setError(err?.message || "There's been an error, please try again.")
      } finally {
        setSubmitting(false)
      }
    },
    [tokenAddress, tokenId]
  )

  return (
    <Box {...props}>
      <Formik
        initialValues={initialValues}
        // validationSchema={fixedPriceSchema}
        onSubmit={handleOnSubmit}
        isInitialValid={false}
      >
        {({ values, isValid }) => (
          <Form>
            <Flex justify="space-between">
              <Label color="secondary" size="lg">
                Bid Amount {`(ETH)`}:
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
              Submit Bid
            </TransactionSubmitButton>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
