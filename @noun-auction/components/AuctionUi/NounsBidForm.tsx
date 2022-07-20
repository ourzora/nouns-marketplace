import React, { useCallback, useState } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useContractWrite, useSigner, useAccount, useContract } from 'wagmi'
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
import { PrintError } from '@market/components'

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
    contract: { minBidIncrementPercentage },
    auctionData,
  } = useNounishAuctionProvider()

  if (!abi || !auctionContractAddress) return null

  const { minBidAmount } = useNounBidIncrement(
    rawCurrentBidAmount,
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
        <Flex py="x2">
          <Input
            type="text"
            min="0"
            pattern="[0-9.]*"
            // min={minBidAmount?.pretty as string || 0}
            placeholder={`${minBidAmount?.pretty} Ξ or more`}
            sizeVariant="lg"
            onChange={(event: any) => handleOnUpdate(event.target.value)}
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
      </form>
    </Box>
  )
}
