import React, { useCallback, useState, useRef, useEffect } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { BigNumber } from 'ethers'
import { Flex, Label, Box, BoxProps } from '@zoralabs/zord'
import { useContractProvider } from 'providers/ContractProvider'
import { useContractWrite } from 'wagmi'

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

  const { abi, contractAddress } = useContractProvider()

  console.log(abi)

  /* @ts-ignore */
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: '0x830bd73e4184cef73443c15111a1df14e495c706',
      contractInterface: abi,
    },
    'createBid',
    { args: ['nounId'] }
  )

  const handleOnSubmit = useCallback(
    async (
      values: NounsBidFormState,
      { setSubmitting }: FormikHelpers<NounsBidFormState>
    ) => {
      // console.log(data, isError, isLoading, write)
      console.log('submit', values)
      try {
        console.log('submit', values)

        write(tokenId)
      } catch (err: any) {
        setError(err?.message || "There's been an error, please try again.")
      } finally {
        setSubmitting(false)
      }
    },
    [tokenAddress, tokenId, data]
  )

  return (
    <Box {...props}>
      <Formik
        initialValues={initialValues}
        // validationSchema={fixedPriceSchema}
        onSubmit={handleOnSubmit}
        isInitialValid={false}
      >
        {({ values }) => (
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
            <button type="submit">Submit</button>
            {/*
            
            <TransactionSubmitButton
              txStatus={txStatus}
              txInProgress={txInProgress}
              // disabled={!isValid}
            >
              Submit Bid
            </TransactionSubmitButton>
            */}
          </Form>
        )}
      </Formik>
    </Box>
  )
}
