import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { Button } from 'components/Button'
import { BigNumber as EthersBN } from 'ethers'

import React, { useCallback, useMemo, useState } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { parseUnits } from '@ethersproject/units'
import { useModal } from '@modal'
import {
  auctionWrapperVariants,
  useNounBidIncrement,
  useNounishAuctionQuery,
} from '@noun-auction'
import {
  AuctionBidder,
  AuctionCountdown,
  AuctionHighBid,
  WalletBalance,
} from '@noun-auction'
import { contractInterface } from '@noun-auction/constants/abis'
import { PrintError, formatContractError } from '@shared'
import { Box, BoxProps, Flex, Grid, Input, Label, Separator, Stack } from '@zoralabs/zord'

interface NounsBidFormProps extends BoxProps {
  onConfirmation?: (txHash: string, amount: string, currencyAddress: string) => void
  layout: keyof typeof auctionWrapperVariants['layout']
  collectionAddress: string
}

export function NounsBidForm({ collectionAddress, ...props }: NounsBidFormProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  if (!activeAuction) return null
  return (
    <NounsBidFormComponent
      activeAuction={activeAuction}
      collectionAddress={collectionAddress}
      {...props}
    />
  )
}

export function NounsBidFormComponent({
  onConfirmation,
  layout,
  collectionAddress,
  activeAuction,
  ...props
}: NounsBidFormProps & { activeAuction: TypeSafeNounsAuction }) {
  const { requestClose } = useModal()

  const [bidAmount, setBidAmount] = useState<string | '0'>('0')

  const { minBidAmount } = useNounBidIncrement(
    activeAuction.reservePrice,
    activeAuction.highestBidPrice?.chainTokenPrice?.raw,
    activeAuction.minBidIncrementPercentage
  )

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

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: activeAuction.address,
    contractInterface,
    functionName: 'createBid',
    overrides: {
      from: address,
      value: bidAmount,
    },
    args: [activeAuction.tokenId],
  })

  const {
    isError,
    isLoading,
    isSuccess,
    error: writeContractError,
    write: placeBid,
  } = useContractWrite(config)

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault()
      placeBid && placeBid()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bidAmount]
  )
  const hasBidInput = useMemo(() => bidAmount !== '0', [bidAmount])
  const isSufficientBid = useMemo(
    () => (minBidAmount?.raw ? bidAmount >= minBidAmount?.raw : false),
    [bidAmount, minBidAmount]
  )

  const hasError = useMemo(
    // Error writing to contract OR error in contract write preparation (initial form setup)
    () => hasBidInput && ((isError && writeContractError) || prepareError),
    [isError, prepareError, writeContractError, hasBidInput]
  )

  const errorOutput = useMemo(() => {
    if (isError && writeContractError) return formatContractError(writeContractError)
    if (prepareError) return formatContractError(prepareError)
    return null
  }, [isError, prepareError, writeContractError])

  return (
    <Box {...props}>
      <form onSubmit={handleOnSubmit}>
        <Flex justify="space-between">
          <Label color="text2" size="lg">
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
          <AuctionCountdown
            startTime={activeAuction.startTime}
            endTime={activeAuction.endTime}
            layoutDirection="row"
            layout="row"
            showLabels
            styles={{ justify: 'space-between' }}
          />
          <Separator />
          <AuctionHighBid layoutDirection="row" showLabels justify="space-between" />
          <Separator />
          <AuctionBidder
            activeAuction={activeAuction}
            layout={layout}
            layoutDirection="row"
            showLabels
            useAvatar={false}
            styles={{
              justify: 'space-between',
            }}
          />
          <Separator />
          {address && (
            <WalletBalance
              layout={layout}
              showLabels
              address={address}
              justify="space-between"
              align="center"
            />
          )}
          <Separator />
        </Stack>
        {hasError && <PrintError errorMessage={errorOutput} mb="x4" />}
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
            <Button
              type="submit"
              loading={isLoading}
              disabled={!isSufficientBid}
              w="100%"
              borderRadius="curved"
            >
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
            Your bid has been placed!
          </Button>
        )}
      </form>
    </Box>
  )
}
