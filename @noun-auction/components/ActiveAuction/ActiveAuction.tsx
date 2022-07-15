import { useMemo, useState } from 'react'
import { Stack, Flex, Grid, Separator, Label } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { PlaceNounsBid } from '../BidUi/PlaceNounsBid'
import { TokenInfo } from './TokenInfo'
import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'

// @shared
import { numberFormatter } from 'utils/numbers'
import { roundTwoDecimals } from 'utils/math'

export interface ActiveAuctionProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  flexDirection: 'row' | 'column'
  wrapperDirection: 'row' | 'column'
}

export function ActiveAuction({
  flexDirection,
  wrapperDirection,
  useModal,
  showLabels = false,
  /* TokenInfo Props */
  thumbnailSize,
  hideThumbnail,
  hideTitle,
  hideCollectionTitle,
  routePrefix,
  ...props
}: ActiveAuctionProps) {
  const { data, isComplete, daoConfig, tokenId, timerComplete } =
    useNounishAuctionProvider()
  // const [ timerComplete, setTimerComplete ] = useState(false)

  const noAuctioHistory = useMemo(() => {
    console.log(tokenId, data?.token?.token?.owner)
    return data?.events?.nodes.length === 0
  }, [data])

  const auctionData = useMemo(() => {
    if (data && data.markets?.nodes.length) {
      const marketData = data.markets?.nodes[0]?.market
      const marketProperties = marketData?.properties

      // console.log(isComplete, data.events?.nodes[0].properties)

      return {
        countdown: {
          startTime: marketProperties?.startTime,
          endTime: marketProperties?.endTime,
        },
        highBid: {
          ethValue: marketProperties?.highestBidPrice?.chainTokenPrice?.decimal,
          usdcValue: numberFormatter(
            roundTwoDecimals(marketProperties?.highestBidPrice?.usdcPrice?.decimal)
          ),
        },
        bidder: {
          address: marketProperties?.highestBidder,
          txHash: marketData?.transactionInfo.transactionHash,
        },
      }
    }
  }, [data])

  if (!auctionData) return null

  return (
    <Flex
      gap="x6"
      direction={wrapperDirection}
      justify="space-between"
      style={{ height: `${wrapperDirection === 'row' ? '100%' : 'auto'}` }}
      className={['nounish-auction__auction-data-wrapper']}
      {...props}
    >
      <Flex gap="x4" w="100%" justify="space-between">
        <TokenInfo
          thumbnailSize={thumbnailSize}
          hideThumbnail={hideThumbnail}
          hideTitle={hideTitle}
          hideCollectionTitle={hideCollectionTitle}
          routePrefix={routePrefix}
          tokenId={tokenId}
          contractAddress={daoConfig?.contractAddress}
        />
        {!isComplete && !noAuctioHistory ? (
          <Grid
            gap={hideTitle || flexDirection === 'row' ? 'x4' : 'x0'}
            direction={flexDirection}
            w="100%"
            className="nounish-auction__complete"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            <AuctionCountdown
              startTime={auctionData.countdown.startTime}
              endTime={auctionData.countdown.endTime}
              layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              showLabels={showLabels}
              justify={'center'}
              align={'flex-end'}
            />
            <AuctionHighBid
              ethValue={auctionData.highBid.ethValue}
              usdcValue={auctionData.highBid.usdcValue}
              layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              showLabels={showLabels}
              justify={'center'}
              align={'flex-end'}
            />
            <AuctionBidder
              address={auctionData.bidder.address}
              txHash={auctionData.bidder.txHash}
              layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              showLabels={showLabels}
              justify={'center'}
              align={'flex-end'}
            />
          </Grid>
        ) : (
          <Flex h="100%" align="center" justify="flex-end">
            <AuctionBidder
              address={
                noAuctioHistory ? data?.token?.token?.owner : auctionData.bidder.address
              }
              txHash={auctionData.bidder.txHash}
              layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              label={noAuctioHistory ? 'Owned by' : 'Winning Bid'}
              showLabels={true}
              align={'flex-end'}
            />
          </Flex>
        )}
      </Flex>
      {!isComplete && (
        <Flex align="center" justify="flex-end">
          <Stack w="100%">
            {!useModal && <Separator mt="x1" />}
            {timerComplete ? (
              <Stack w="100%">
                <Label className={placeBidTrigger} as="span" size="md">
                  Settle Auction
                </Label>
              </Stack>
            ) : (
              <PlaceNounsBid useModal={useModal} />
            )}
          </Stack>
        </Flex>
      )}
    </Flex>
  )
}
