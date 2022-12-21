import { Field, FieldProps, Form, Formik } from 'formik'

import React, { useEffect } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { PrintError } from '@shared/components/PrintError'
import { formatContractError } from '@shared/utils'
import { validateCurrency } from '@shared/utils/validateCurrency'
import { Heading, InputField, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { useV3AskTransaction } from '../hooks/useV3AskTransaction'

interface V3AskUpdateProps extends CommonV3AskComponentProps {}

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

export function V3AskUpdate({ onNext, ...props }: V3AskUpdateProps) {
  const { nft } = props
  const { txStatus, txInProgress, txError, finalizedTx, updateAsk } = useV3AskTransaction(
    { nft: nft }
  )

  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Formik
      initialValues={{ amount: '' }}
      isInitialValid={false}
      validate={validate}
      onSubmit={async (values) => {
        updateAsk({
          price: values.amount,
        })
      }}
    >
      {({
        // values,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <Stack gap="x6" {...props}>
            <Heading as="h2" size="md">
              Update List Price
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
              {txError && <PrintError errorMessage={formatContractError(txError)} />}
            </Stack>
            <TransactionSubmitButton
              type="submit"
              txStatus={txStatus}
              txInProgress={txInProgress}
              loading={isSubmitting}
              disabled={!isValid}
              w="100%"
            >
              Update List Price
            </TransactionSubmitButton>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
