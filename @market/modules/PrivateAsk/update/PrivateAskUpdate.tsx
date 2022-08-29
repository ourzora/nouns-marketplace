import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
import { TransactionSubmitButton, useRelevantMarket } from '@market'
import {
  // MotionStack,
  PrintError,
  validateCurrency,
} from '@shared'
import { reverseLookupAddress } from '@shared/utils/reverseLookupAddress'
import { Heading, InputField, Stack } from '@zoralabs/zord'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useMemo } from 'react'
import { usePrivateAskTransaction } from '../hooks'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskUpdateProps extends CommonPrivateAskComponentProps {}

interface Values {
  amount: string
}

const validate = (values: Values) => {
  let newValue: BigNumber
  try {
    newValue = parseUnits(values.amount.toString() || '0', 'ether')
  } catch (e) {
    // don't update the input on invalid values
    return
  }

  const errors = {}

  // amount
  const invalidAmount = validateCurrency(values.amount, 'NFT price')

  // @ts-ignore
  if (invalidAmount) errors.amount = invalidAmount

  return errors
}

export function PrivateAskUpdate({ onNext, ...props }: PrivateAskUpdateProps) {
  const { nft } = props
  const { markets } = nft
  const { ask } = useRelevantMarket(markets)
  const { txStatus, txInProgress, txError, updateAsk } = usePrivateAskTransaction({
    nft: nft,
    onNext,
  })
  const buyerAddress = useMemo<string>(() => ask.raw.properties.buyer, [ask])

  useMemo(() => console.log('ASK', ask), [ask])

  return (
    // <MotionStack
    //   gap="x5"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.2 }}
    //   {...props}
    // >

    <Formik
      initialValues={{ amount: '' }}
      validate={validate}
      onSubmit={async (values) => {
        const maybeBuyerAddressENS = await reverseLookupAddress(buyerAddress)
        updateAsk({
          price: values.amount,
          buyerAddress: buyerAddress,
          rawBuyerAddress: maybeBuyerAddressENS!,
        })
      }}
    >
      {({ values, isValid, isSubmitting }) => (
        <Form>
          <Stack gap="x6" {...props}>
            <Heading size="xs">Update List Price</Heading>
            <Stack gap="x2">
              <Field name="amount">
                {({ field, meta: { touched, error } }: FieldProps) => (
                  <InputField
                    label="NFT Price"
                    indentFields={false}
                    affix="ETH"
                    variant="lg"
                    type="number"
                    canError
                    pattern="[0-9]+([\.,][0-9]+)?"
                    step={0.000001}
                    placeholder="0"
                    // headerElement={ // TODO: Add ExchangeValueAmount with updated useExchangeValue hook once we find a path forward (removal of zora-api-three needed)
                    //   <ExchangeValueAmount amount={values.amount.toString() || '0'} />
                    // }
                    min={0}
                    inputMode="decimal"
                    error={(touched && error) || undefined}
                    {...field}
                  />
                )}
              </Field>

              {txError && <PrintError errorMessage={txError} />}
            </Stack>
            <TransactionSubmitButton
              type="submit"
              txStatus={txStatus}
              txInProgress={txInProgress}
              loading={isSubmitting}
              disabled={!isValid}
            >
              Update List Price
            </TransactionSubmitButton>
          </Stack>
        </Form>
      )}
    </Formik>
    // </MotionStack>
  )
}
