import { useAccount } from 'wagmi'

import { BigNumber as EthersBN } from 'ethers'

import React, { useCallback } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { parseUnits } from '@ethersproject/units'
import { useModal } from '@modal'
import { useNounBidIncrement } from '@noun-auction'
import {
  AuctionBidder,
  AuctionCountdown,
  AuctionHighBid,
  WalletBalance,
} from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { useButtonRequiresAuth } from '@shared'
import { Box, Button, Flex, Grid, Input, Label, Separator, Stack } from '@zord'

export type NounsBidFormComponentProps = {
  activeAuction: TypeSafeNounsAuction
  handleOnSubmit: any // FIXME: find ugly type for this
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  setBidAmount: (s: string) => void
  bidAmount: string
  onConfirmation?: any
  layout: 'row' | 'historyOnly' | 'withHistory' | 'sideBarBid' | 'collectionHero'
  errorComponent?: JSX.Element | null | false
  prepareError: Error | null
}

export function NounsBidFormComponent({
  onConfirmation,
  layout,
  bidAmount,
  setBidAmount,
  activeAuction,
  handleOnSubmit,
  isError,
  isLoading,
  isSuccess,
  errorComponent,
  prepareError,
  ...props
}: NounsBidFormComponentProps) {
  const { address } = useAccount()
  const { requestClose } = useModal()

  const variableButtonBehavior = useButtonRequiresAuth(undefined)

  const { isEnded: auctionCompleted } = useIsAuctionCompleted({
    activeAuction,
  })
  const { minBidAmount } = useNounBidIncrement(
    activeAuction.reservePrice,
    activeAuction.highestBidPrice?.chainTokenPrice?.raw,
    activeAuction.minBidIncrementPercentage
  )

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

  const bid = EthersBN.from(bidAmount)
  const min = EthersBN.from(minBidAmount.raw)
  const isSufficientBid = bidAmount === '0' ? false : bid.gte(min)

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
            disabled={isSuccess}
            pattern="[0-9.]*"
            placeholder={`${minBidAmount?.pretty} Ξ or more`}
            size="lg"
            onChange={(event: any) => handleOnUpdate(event.target.value)}
          />
        </Flex>
        <Stack gap="x4" mb="x4">
          <AuctionCountdown
            auctionCompleted={auctionCompleted}
            auctionStartTime={activeAuction.startTime}
            auctionEndTime={activeAuction.endTime}
            direction="row"
            layout="row"
            showLabels
            justify="space-between"
          />
          <Separator />
          <AuctionHighBid
            auctionCompleted={auctionCompleted}
            highestBid={activeAuction.highestBidPrice?.nativePrice?.raw}
            collectionAddress={activeAuction.collectionAddress}
            layout={layout}
            showLabels
            direction="row"
            justify="space-between"
          />
          <Separator />
          <AuctionBidder
            highestBidder={activeAuction.highestBidder}
            layout={layout}
            direction="row"
            showLabels
            useAvatar={false}
            justify="space-between"
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
        {errorComponent}
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
              disabled={!isSufficientBid || !!prepareError}
              w="100%"
              borderRadius="curved"
              onClick={variableButtonBehavior}
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
