import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { BigNumberField, TransactionSubmitButton, useContractContext } from '@market'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'
import {
  isAddress,
  MotionStack,
  useContractTransaction,
  validateCurrency,
  validateENSAddress,
} from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Heading, InputField, Paragraph, Stack, StackProps } from '@zoralabs/zord'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import React, { useCallback, useState } from 'react'

interface PrivateAskCreateProps extends StackProps {
  onNext: () => void
  nft: NFTObject
}

interface Values {
  buyeraddress: string
  amount: string
}

const validate = (values: Values) => {
  console.log('FORMIK VALIDATION........')
  console.log(values.amount)

  // let parseInputValue
  // // const ETH_DECIMALS = 18
  // parseInputValue = parseUnits(values.amount.toString() || '0', 'ether')
  // console.log(`${values.amount} --> ${parseInputValue}`)

  let newValue: BigNumber
  try {
    newValue = parseUnits(values.amount.toString() || '0', 'ether')
  } catch (e) {
    // don't update the input on invalid values
    return
  }

  // const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max))
  // if (invalidValue) {
  //   return
  // }

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
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { setFinalizedPrivateAskTx } = usePrivateAskContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [txError, setTxError] = useState<string>('')
  const { nft } = props.nft
  // const { tokenId, contract } = nft
  // const

  const handleSubmit = useCallback(
    async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
      // @TODO: submit private ask

      console.log('VALUES', values)

      try {
        if (!nft || !values.buyeraddress || !values.amount || !PrivateAsks) {
          throw new Error('V3AskContract is not ready, please try again.')
        }

        // let parseInputValue
        // // const ETH_DECIMALS = 18
        // parseInputValue = parseUnits(values.amount || '0', 'ether')

        // let parseInputValue
        // const ETH_DECIMALS = 18
        const parseInputValue = parseUnits(values.amount.toString() || '0', 'ether') // Convert from human-readable number to GWEI

        setSubmitting(true)
        const promise: Promise<ContractTransaction> = PrivateAsks.createAsk(
          nft?.contract.address!,
          nft?.tokenId!,
          // values.amount,
          parseInputValue,
          values.buyeraddress
        )
        const tx = await handleTx(promise)
        // onConfirmation(tx.hash, values.amount.toString(), values.currency.id)
        console.log('promise', promise)
        console.log('tx.hash', tx.hash)

        // export interface TransactionReceipt {
        //   to: string
        //   from: string
        //   contractAddress: string
        //   transactionIndex: number
        //   root?: string
        //   gasUsed: BigNumber
        //   logsBloom: string
        //   blockHash: string
        //   transactionHash: string
        //   logs: Array<Log>
        //   blockNumber: number
        //   confirmations: number
        //   cumulativeGasUsed: BigNumber
        //   effectiveGasPrice: BigNumber
        //   byzantium: boolean
        //   type: number
        //   status?: number
        // }

        // setFinalizedPrivateAskTx(tx)

        // if(tx.){

        setFinalizedPrivateAskTx({
          price: values.amount,
          buyerAddress: values.buyeraddress,
        })
        // }

        tx && onNext && onNext()
      } catch (err: any) {
        console.log('PrivateAskError', err)
        setTxError(err?.message || "There's been an error, please try again.")
      } finally {
        console.log('FINALLY')
        setSubmitting(false)
      }

      // // PrivateAsks.createAsk(tokencontract, tokenId, price, buyer)

      // setSubmitting(false)
      onNext && onNext()
    },
    [PrivateAsks, handleTx, nft, onNext]
  )

  const handleChange = useCallback(() => {
    console.log('handleChange ------->')
  }, [])

  return (
    <MotionStack
      gap="x5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <Heading size="xs">Create a Private Ask</Heading>

      <Formik
        initialValues={{ buyeraddress: '', amount: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, isSubmitting }) => (
          <Form>
            <Stack gap="x1">
              <Field name="amount" onChange={handleChange}>
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
                      min={0} // ok
                      max={2}
                      // pattern="[0-9.]*"// ok
                      inputMode="decimal"
                      error={(touched && error) || undefined} // ok
                      {...field} // ok
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

              <TransactionSubmitButton
                type="submit"
                txStatus={txStatus}
                txInProgress={txInProgress}
                loading={isSubmitting}
                disabled={!isValid}
              >
                Create Private Ask
              </TransactionSubmitButton>
              {/* <Button type="submit" disabled={!isValid} loading={isSubmitting}>
                Create Private Ask
              </Button> */}
            </Stack>
          </Form>
        )}
      </Formik>
    </MotionStack>
  )
}
