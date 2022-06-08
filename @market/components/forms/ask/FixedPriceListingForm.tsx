import React, { useCallback, useState } from 'react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { ContractTransaction } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { Box, Eyebrow, Flex } from '@zoralabs/zord'

// import { ExchangeValue, ExchangeValueAmount } from '@next/components/ExchangeValue'
// import { RangeFieldAccordion } from '@next/components/RangeFieldAccordion'
import {
  InputGroup,
  InputPad,
  TransactionSubmitButton,
  PrintError,
} from '@market/components'

// import { CurrencyAmountField, CurrencyAmountFieldVariants } from 'compositions/forms/CurrencyAmountField'
// import { CurrencyField, CurrencyFieldVariants } from 'compositions/forms/CurrencyField'

import { useAuth, useContractContext, useContractTransaction } from '@market/hooks'

import {
  AUCTION_CURRENCY_OPTIONS,
  Currency,
  ETH_CURRENCY_SHIM,
  INITIAL_VALUE_ZERO,
  fixedPriceSchema,
  validateCurrency,
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
          <Flex justify="space-between" px="x4">
            <Eyebrow color="secondary">NFT Price</Eyebrow>
            {/* 
            <ExchangeValue
              fallback="..."
              currencyAddress={values.currency.id}
              amount={values.amount.toString() || '0'}
            >
              {(rate) => <ExchangeValueAmount amount={values.amount} rate={rate} />}
            </ExchangeValue>
            */}
          </Flex>
          <Flex py="x2">
            currency field
            {/*<InputGroup>
              <CurrencyAmountField
                validateBalance={false}
                showMax={false}
                showBalance={false}
                showSymbol={false}
                name="amount"
                validate={validateCurrency}
                currencyAddress={values.currency.id}
                decimals={values.currency.decimals}
                placeholder={INITIAL_VALUE_ZERO}
                variant={CurrencyAmountFieldVariants.LARGE}
                style={{ marginBottom: 0 }}
              />
              <InputPad align="center">
                <CurrencyField
                  disabled={false}
                  options={AUCTION_CURRENCY_OPTIONS}
                  name="currency"
                  variant={CurrencyFieldVariants.WHITE_PILL}
                />
              </InputPad>
            </InputGroup>*/}
          </Flex>
          {/*<ErrorField name="currency" />
          <ErrorField name="amount" />*/}
          {/*!isUpdate && (
            <>
              <Box my="x4">
                <Field
                  name="findersFeeBps"
                  render={({ field, form }: FieldProps) => (
                    <RangeFieldAccordion
                      title={`Finder's fee`}
                      tooltipText="A percentage of the sale that will be paid to the protocol or platform that finds the buyer for your NFT"
                      amount={values.amount}
                      currency={values.currency}
                      value={field.value}
                      range={{
                        min: 0,
                        max: 10,
                        value: values.findersFeeBps,
                        unitName: '%',
                        unitNamePlural: '%',
                      }}
                      handleChange={(val: number) =>
                        form.setFieldValue('findersFeeBps', val, true)
                      }
                    />
                  )}
                />
              </Box>
              <ErrorField name="findersFeeBps" />
            </>
                    )*/}
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
