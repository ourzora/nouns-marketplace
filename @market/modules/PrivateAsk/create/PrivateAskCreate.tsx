import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import {
  formatContractError,
  isAddress,
  PrintError,
  validateCurrency,
  validateENSAddress,
} from '@shared'
import { resolvePossibleENSAddress } from '@shared/utils/resolvePossibleENSAddress'
import { Heading, InputField, Stack } from '@zoralabs/zord'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'
import { LearnMoreButton } from '../LearnMoreButton'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'

interface PrivateAskCreateProps extends CommonPrivateAskComponentProps {}

interface Values {
  buyeraddress: string
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

  // address
  const isEns = validateENSAddress(values.buyeraddress)
  if (!values.buyeraddress) {
    // @ts-ignore
    errors.buyeraddress = 'Buyer address required'
  } else if (!isAddress(values.buyeraddress) && !isEns) {
    // @ts-ignore
    errors.buyeraddress = 'Buyer address not valid'
  }

  return errors
}

export function PrivateAskCreate({ onNext, ...props }: PrivateAskCreateProps) {
  const { txStatus, txInProgress, txError, createAsk, finalizedTx } =
    usePrivateAskTransaction({ nft: props.nft })
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Formik
      initialValues={{ buyeraddress: '', amount: '' }}
      isInitialValid={false}
      validate={validate}
      onSubmit={async (values) => {
        const resolvedBuyerAddress = await resolvePossibleENSAddress(values.buyeraddress)
        createAsk({
          price: values.amount,
          buyerAddress: resolvedBuyerAddress!,
          rawBuyerAddress: values.buyeraddress,
        })
      }}
    >
      {({
        //values,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <Stack gap="x6" {...props}>
            <Heading as="h2" size="md">
              Private Listing
            </Heading>
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

              <Field name="buyeraddress">
                {({ field, meta: { touched, error } }: FieldProps) => {
                  return (
                    <InputField
                      label="Buyer"
                      indentFields={false}
                      variant="lg"
                      canError
                      placeholder="0x... or .eth"
                      error={(touched && error) || undefined}
                      {...field}
                    />
                  )
                }}
              </Field>

              {txError && <PrintError errorMessage={formatContractError(txError)} />}
            </Stack>
            <Stack gap="x4">
              <TransactionSubmitButton
                type="submit"
                txStatus={txStatus}
                txInProgress={txInProgress}
                loading={isSubmitting}
                disabled={!isValid}
              >
                Create Private Listing
              </TransactionSubmitButton>
              <LearnMoreButton>Learn more about modules on Zora</LearnMoreButton>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
