import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
import { TransactionSubmitButton } from '@market'
import { isAddress, MotionStack, validateCurrency, validateENSAddress } from '@shared'
import { Heading, InputField, Paragraph, Stack } from '@zoralabs/zord'
import { Field, FieldProps, Form, Formik } from 'formik'
import React from 'react'
import { usePrivateAskTransaction } from '../hooks'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskCreateProps extends CommonPrivateAskComponentProps {}

interface Values {
  buyeraddress: string
  amount: string
}

const validate = (values: Values) => {
  // console.log('FORMIK VALIDATION........')
  // console.log(values.amount)

  let newValue: BigNumber
  try {
    newValue = parseUnits(values.amount.toString() || '0', 'ether')
  } catch (e) {
    // don't update the input on invalid values
    return
  }

  // console.log(`value: ' ${value}, newValue: ${newValue.toString()}`)
  console.log(`newValue: ${newValue.toString()}`)

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

  console.log(errors)

  return errors
}

export function PrivateAskCreate({ onNext, ...props }: PrivateAskCreateProps) {
  const { txStatus, txInProgress, txError, createAsk } = usePrivateAskTransaction({
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
      <Heading size="xs">Create a Private Ask</Heading>

      <Formik
        initialValues={{ buyeraddress: '', amount: '' }}
        validate={validate}
        onSubmit={(values) =>
          createAsk({
            price: values.amount,
            buyerAddress: values.buyeraddress,
          })
        }
      >
        {({ values, isValid, isSubmitting }) => (
          <Form>
            <Stack gap="x2">
              <Field name="amount">
                {({ field, meta: { touched, error } }: FieldProps) => {
                  return (
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
                  )
                }}
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

              {txError && <Paragraph size="xs">{txError}</Paragraph>}
            </Stack>
            <TransactionSubmitButton
              type="submit"
              txStatus={txStatus}
              txInProgress={txInProgress}
              loading={isSubmitting}
              disabled={!isValid}
            >
              Create Private Ask
            </TransactionSubmitButton>
          </Form>
        )}
      </Formik>
    </Stack>
    // </MotionStack>
  )
}
