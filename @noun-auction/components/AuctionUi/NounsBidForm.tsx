import React, { useCallback, useEffect, useState } from 'react'
import { parseUnits } from '@ethersproject/units'
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
  Input,
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
import { PrintError } from '@shared'

interface NounsBidFormProps extends BoxProps {
  tokenAddress: string
  isUpdate?: boolean
  currentBidAmount?: any
  rawCurrentBidAmount: string
  onConfirmation: (txHash: string, amount: string, currencyAddress: string) => void
}

export function NounsBidForm({
  tokenAddress,
  onConfirmation,
  currentBidAmount,
  rawCurrentBidAmount,
  isUpdate = false,
  ...props
}: NounsBidFormProps) {
  const { requestClose } = useModal()

  const [bidAmount, setBidAmount] = useState<string | '0'>('0')

  const {
    daoConfig: { auctionContractAddress, abi },
    tokenId,
    minBidIncrementPercentage,
    reservePrice,
    activeAuction,
  } = useNounishAuctionProvider()

  const { minBidAmount } = useNounBidIncrement(
    reservePrice,
    activeAuction?.properties?.highestBidPrice?.chainTokenPrice?.raw,
    minBidIncrementPercentage
  )

  const { data: signer } = useSigner()
  const { address } = useAccount()

  const handleOnUpdate = useCallback(
    (value: string) => {
      let newValue: EthersBN
      try {
        newValue = parseUnits(value, 18)
        const bidString = newValue.toString()
        setBidAmount(bidString)
      } catch (e) {
        console.error(e)
        return
      }
    },
    [setBidAmount]
  )

  /* @ts-ignore */
  const {
    isError,
    isLoading,
    isSuccess,
    error: writeContractError,
    write: placeBid,
  } = useContractWrite({
    addressOrName: auctionContractAddress as string,
    contractInterface: abi,
    signerOrProvider: signer,
    functionName: 'createBid',
    overrides: {
      from: address,
      value: bidAmount,
    },
    args: [tokenId],
  })

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault()
      placeBid()
    },
    [bidAmount]
  )

  return (
    <Box {...props}>
      <form onSubmit={handleOnSubmit}>
        <Flex justify="space-between">
          <Label color="secondary" size="lg">
            Bid
          </Label>
        </Flex>
        <Flex py="x2" mb="x4">
          <Input
            type="text"
            min={minBidAmount?.pretty}
            pattern="[0-9.]*"
            placeholder={`${minBidAmount?.pretty} Ξ or more`}
            sizeVariant="lg"
            onChange={(event: any) => handleOnUpdate(event.target.value)}
          />
        </Flex>
        <Stack gap="x4" mb="x4">
          <AuctionCountdown layoutDirection="row" showLabels justify="space-between" />
          <Separator />
          <AuctionHighBid layoutDirection="row" showLabels justify="space-between" />
          <Separator />
          <AuctionBidder
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
        {!isSuccess ? (
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
        ) : (
          <Button
            onClick={requestClose}
            w="100%"
            variant="secondary"
            borderRadius="curved"
          >
            You're bid has been placed!
          </Button>
        )}
      </form>
    </Box>
  )
}
