import { useAccount, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import { Button } from 'components/Button'
import { BigNumber as EthersBN } from 'ethers'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { parseUnits } from '@ethersproject/units'
import { useContractContext } from '@market'
import { useModal } from '@modal'
import {
  auctionWrapperVariants,
  lilNounsAbi,
  nounsAbi,
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
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { PrintError, formatContractError } from '@shared'
import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory,
} from '@zoralabs/nouns-protocol/dist/typechain'
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
  const { address } = useAccount()
  const { requestClose } = useModal()
  const { data: signer } = useSigner()
  const [bidAmount, setBidAmount] = useState<string | '0'>('0')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [BuilderNounsAuction, setBuilderNounsAuction] = useState<AuctionInterface>()

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

  const NOUNS_AUCTION_ADDRESS = '0x830bd73e4184cef73443c15111a1df14e495c706'
  const LIL_NOUNS_AUCTION_ADDRESS = '0x55e0f7a3bb39a28bd7bcc458e04b3cf00ad3219e'

  // console.log({
  //   add: activeAuction.address,
  //   NOUNS_AUCTION_ADDRESS,
  //   LIL_NOUNS_AUCTION_ADDRESS,
  // })

  let abi =
    activeAuction.address === NOUNS_AUCTION_ADDRESS
      ? nounsAbi
      : LIL_NOUNS_AUCTION_ADDRESS === activeAuction.address
      ? lilNounsAbi
      : contractInterface

  const hasBidInput = useMemo(() => bidAmount !== '0', [bidAmount])

  const bid = EthersBN.from(bidAmount)
  const min = EthersBN.from(minBidAmount.raw)
  const isSufficientBid = bidAmount === '0' ? false : bid.gte(min)

  const { isEnded: auctionCompleted, countdownText } = useIsAuctionCompleted({
    activeAuction,
  })

  useEffect(() => {
    if (activeAuction.address && signer) {
      setBuilderNounsAuction(
        BuilderNounsAuction__factory.connect(activeAuction.address, signer)
      )
    }
  }, [activeAuction.address, signer])

  const handleOnSubmit = useCallback(
    async (event) => {
      setIsLoading(true)
      try {
        event.preventDefault()
        const tx = await BuilderNounsAuction?.createBid(activeAuction.tokenId, {
          value: bidAmount,
        })

        console.log({ tx })
        setIsSuccess(true)
      } catch (err: any) {
        setIsError(err)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [BuilderNounsAuction, activeAuction.tokenId, bidAmount]
  )

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
            sizeVariant="lg"
            onChange={(event: any) => handleOnUpdate(event.target.value)}
          />
        </Flex>
        <Stack gap="x4" mb="x4">
          <AuctionCountdown
            auctionCompleted={auctionCompleted}
            countdownText={countdownText}
            startTime={activeAuction.startTime}
            endTime={activeAuction.endTime}
            layoutDirection="row"
            layout="row"
            showLabels
            styles={{ justify: 'space-between' }}
          />
          <Separator />
          <AuctionHighBid
            auctionCompleted={auctionCompleted}
            highestBid={activeAuction.highestBidPrice?.nativePrice?.raw}
            collectionAddress={activeAuction.collectionAddress}
            layout={layout}
            showLabels
            styles={{
              layoutDirection: 'row',
              justify: 'space-between',
            }}
          />
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
        {isError && <PrintError errorMessage={isError} mb="x4" />}
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
