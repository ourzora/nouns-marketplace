import { useMemo } from 'react'
import { Stack, Flex, Grid, Separator } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { PlaceNounsBid } from '../BidUi/PlaceNounsBid'
import { TokenInfo } from './TokenInfo'

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
  const { data, isComplete, auctionConfigParams } = useNounishAuctionProvider()

  if (!data) return null

  const marketData = data.markets?.nodes[0]?.market
  const marketProperties = marketData?.properties

  /**
   * Normalze auctionData
   */

  const auctionData = useMemo(() => {
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
  }, [data])

  return (
    <Flex
      gap="x6"
      direction={wrapperDirection}
      justify="space-between"
      style={{ height: `${wrapperDirection === 'row' ? '100%' : 'auto'}` }}
      className={['nounish-auction__auction-data-wrapper']}
      {...props}
    >
      <Flex gap="x4" w="100%">
        <TokenInfo
          thumbnailSize={thumbnailSize}
          hideThumbnail={hideThumbnail}
          hideTitle={hideTitle}
          hideCollectionTitle={hideCollectionTitle}
          routePrefix={routePrefix}
          tokenId={auctionConfigParams?.tokenId}
          contractAddress={auctionConfigParams?.contractAddress}
        />
        {!isComplete ? (
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
          <Flex>
            <AuctionBidder
              address={auctionData.bidder.address}
              txHash={auctionData.bidder.txHash}
              layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              label="Winning Bid"
            />
          </Flex>
        )}
      </Flex>
      {!isComplete && (
        <Flex align="center" justify="flex-end">
          <Stack w="100%">
            {!useModal && <Separator mt="x1" />}
            <PlaceNounsBid useModal={useModal} />
          </Stack>
        </Flex>
      )}
    </Flex>
  )
}
