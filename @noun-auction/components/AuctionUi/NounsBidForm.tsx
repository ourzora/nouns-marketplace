import React, { useCallback } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useContractWrite, useSigner, useAccount } from 'wagmi'
import { BigNumber as EthersBN } from 'ethers'
import {
  Flex,
  Label,
  Box,
  BoxProps,
  Button,
  Grid,
  Stack,
  Separator,
} from '@zoralabs/zord'

import { useModal } from '@modal'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { useNounBidIncrement } from '@noun-auction'
import {
  AuctionCountdown,
  AuctionHighBid,
  AuctionBidder,
  WalletBalance,
} from '@noun-auction'

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
  const { modalType, requestClose, requestOpen } = useModal()

  const {
    daoConfig: { auctionContractAddress, abi },
    tokenId,
    contract: { minBidIncrementPercentage },
    auctionData,
  } = useNounishAuctionProvider()

  if (!abi || !auctionContractAddress) return null

  const { minBidAmount } = useNounBidIncrement(
    rawCurrentBidAmount,
    minBidIncrementPercentage
  )

  const { data: signer } = useSigner()
  const { address, isConnecting, isDisconnected } = useAccount()

  console.log(address)

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
    signerOrProvider: signer,
    functionName: 'createBid',
  })

  const handleOnSubmit = useCallback(
    async (
      values: NounsBidFormState,
      { setSubmitting }: FormikHelpers<NounsBidFormState>
    ) => {
      // console.log(data, isError, isLoading, write)
      console.log('submit', values)
      try {
        // console.log('submit', values.amount)
        /*
        placeBid(tokenId, {
          value,
          gasLimit: gasLimit.add(10_000), // A 10,000 gas pad is used to avoid 'Out of gas' errors
        })
        */
        placeBid()
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
        onSubmit={handleOnSubmit}
        isInitialValid={false}
      >
        {({ values }) => (
          <Form>
            <Flex justify="space-between">
              <Label color="secondary" size="lg">
                Bid
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
            <Stack gap="x4" mb="x4">
              <AuctionCountdown
                startTime={auctionData.countdown.startTime}
                endTime={auctionData.countdown.endTime}
                layoutDirection="row"
                showLabels
                justify="space-between"
              />
              <Separator />
              <AuctionHighBid
                ethValue={auctionData.highBid.ethValue}
                usdcValue={auctionData.highBid.usdcValue}
                layoutDirection="row"
                showLabels
                justify="space-between"
              />
              <Separator />
              <AuctionBidder
                address={auctionData.bidder.address}
                txHash={auctionData.bidder.txHash}
                layoutDirection="row"
                showLabels
                useAvatar={false}
                justify="space-between"
              />
              <Separator />
              {address && (
                <WalletBalance
                  showLabels
                  address={address}
                  justify="space-between"
                  align="center"
                />
              )}
              <Separator />
            </Stack>
            {isError && <PrintError errorMessage={writeContractError?.message} mb="x4" />}
            <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x2">
              <Button
                onClick={requestClose}
                w="100%"
                variant="secondary"
                borderRadius="curved"
              >
                Cancel
              </Button>
              <Button type="submit" loading={isLoading} w="100%" borderRadius="curved">
                Place Bid
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
