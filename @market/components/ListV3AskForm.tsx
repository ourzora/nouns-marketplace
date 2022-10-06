import * as Yup from 'yup'
import { useCallback, useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ContractTransaction } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { Flex, Label, Grid } from '@zoralabs/zord'
import {
  PrintError,
  useAuth,
  useContractTransaction,
  ETH_CURRENCY_SHIM,
  Currency,
} from '@shared'
import { TransactionSubmitButton, BigNumberField } from '@market/components'
import { useContractContext } from '@market/providers'
import * as Sentry from '@sentry/react'

export const fixedPriceSchema = Yup.object().shape({
  currency: Yup.object().required(),
  amount: Yup.number().required('List price is a required value'),
  listingFeePercentage: Yup.number().optional(),
  findersFeeBps: Yup.number().min(0).max(10),
})

type ListV3AskFormProps = {
  tokenId: string
  tokenAddress: string
  isUpdate?: boolean
  onConfirmation: (txHash: string, amount: string, currencyAddress: string) => void
  cancelButton?: JSX.Element
}

type ListV3AskFormState = {
  currency: Currency
  amount: BigNumber
  findersFeeBps: number
}

const initialValues: ListV3AskFormState = {
  currency: ETH_CURRENCY_SHIM,
  amount: BigNumber.from(0),
  findersFeeBps: 0,
}

export function ListV3AskForm({
  tokenId,
  tokenAddress,
  onConfirmation,
  isUpdate = false,
  cancelButton,
}: ListV3AskFormProps) {
  const { address } = useAuth()
  const [error, setError] = useState<string>()
  const { AsksV11 } = useContractContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()

  const handleOnSubmit = useCallback(
    async (
      values: ListV3AskFormState,
      { setSubmitting }: FormikHelpers<ListV3AskFormState>
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
        Sentry.captureException(err)
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
            <Label color="text2" size="lg">
              NFT Price {`(ETH)`}:
            </Label>
          </Flex>
          <Flex py="x2">
            <BigNumberField
              type="text"
              pattern="[0-9.]*"
              name="amount"
              min={'0'}
              placeholder="0.00"
              decimals={values.currency.decimals}
            />
          </Flex>
          {error && <PrintError errorMessage={error} mb="x4" />}
          <Grid
            style={{ gridTemplateColumns: cancelButton ? '1fr 1fr' : '1fr' }}
            gap="x2"
          >
            {cancelButton}
            <TransactionSubmitButton
              txStatus={txStatus}
              txInProgress={txInProgress}
              disabled={!isValid}
              type="submit"
            >
              List
            </TransactionSubmitButton>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
