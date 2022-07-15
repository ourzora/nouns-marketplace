import React, { useCallback } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useContractWrite } from 'wagmi'
import { BigNumber as EthersBN } from 'ethers'
import { Flex, Label, Box, BoxProps, Button } from '@zoralabs/zord'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { useNounBidIncrement } from '@noun-auction'

// Imports from @markets
import { PrintError, BigNumberField } from '@market/components'
import { Currency, ETH_CURRENCY_SHIM } from '@market/utils'

interface NounsBidFormProps extends BoxProps {
  tokenAddress: string
  isUpdate?: boolean
  currentBidAmount?: any
  rawCurrentBidAmount: string
  onConfirmation: (txHash: string, amount: string, currencyAddress: string) => void
}

type NounsBidFormState = {
  currency: Currency
  amount: EthersBN
}

const initialValues: NounsBidFormState = {
  currency: ETH_CURRENCY_SHIM,
  amount: EthersBN.from(0),
}

export function NounsBidForm({
  tokenAddress,
  onConfirmation,
  currentBidAmount,
  rawCurrentBidAmount,
  isUpdate = false,
  ...props
}: NounsBidFormProps) {
  const {
    daoConfig: { auctionContractAddress, abi },
    tokenId,
    contract: { minBidIncrementPercentage },
  } = useNounishAuctionProvider()

  if (!abi || !auctionContractAddress) return null

  const { minBidAmount } = useNounBidIncrement(
    rawCurrentBidAmount,
    minBidIncrementPercentage
  )

  /* @ts-ignore */
  const {
    data,
    isError,
    isLoading,
    error: writeContractError,
    write: placeBid,
  } = useContractWrite({
    addressOrName: auctionContractAddress as string,
    contractInterface: abi,
    functionName: 'createBid',
  })

  const handleOnSubmit = useCallback(
    async (
      values: NounsBidFormState,
      { setSubmitting }: FormikHelpers<NounsBidFormState>
    ) => {
      // console.log(data, isError, isLoading, write)
      // console.log('submit', values)
      try {
        // console.log('submit', values.amount)
        /*
        placeBid(tokenId, {
          value,
          gasLimit: gasLimit.add(10_000), // A 10,000 gas pad is used to avoid 'Out of gas' errors
        })
        */
      } catch (err: any) {
        console.log(err)
      } finally {
        setSubmitting(false)
      }
    },
    [tokenId, data]
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
                placeholder={`${minBidAmount?.pretty} Ξ or more`}
                decimals={values.currency.decimals}
              />
            </Flex>
            {isError && <PrintError errorMessage={writeContractError?.message} mb="x4" />}
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
