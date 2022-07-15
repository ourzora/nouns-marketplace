import { Flex, Separator, Label } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { PlaceNounsBid } from '../BidUi/PlaceNounsBid'
import { TokenInfo } from './TokenInfo'
import {
  placeBidTrigger,
  auctionWrapperVariants,
} from '@noun-auction/styles/NounishStyles.css'

export interface ActiveAuctionProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  layout: keyof typeof auctionWrapperVariants['layout']
}

export function ActiveAuction({
  layout,
  useModal,
  showLabels = false,
  /* TokenInfo Props */
  thumbnailSize,
  hideThumbnail,
  hideTitle,
  hideCollectionTitle,
  routePrefix,
}: ActiveAuctionProps) {
  const {
    data,
    isComplete,
    noAuctionHistory,
    daoConfig,
    tokenId,
    timerComplete,
    auctionData,
  } = useNounishAuctionProvider()

  if (!auctionData) return null

  return (
    <>
      <TokenInfo
        thumbnailSize={thumbnailSize}
        hideThumbnail={hideThumbnail}
        hideTitle={hideTitle}
        hideCollectionTitle={hideCollectionTitle}
        routePrefix={routePrefix}
        tokenId={tokenId}
        contractAddress={daoConfig?.contractAddress}
      />
      {!isComplete && !noAuctionHistory ? (
        <>
          <AuctionCountdown
            startTime={auctionData.countdown.startTime}
            endTime={auctionData.countdown.endTime}
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
          />
          <AuctionHighBid
            ethValue={auctionData.highBid.ethValue}
            usdcValue={auctionData.highBid.usdcValue}
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
          />
          <AuctionBidder
            address={auctionData.bidder.address}
            txHash={auctionData.bidder.txHash}
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
          />
        </>
      ) : (
        <Flex h="100%" align="center" justify="flex-end" style={{ gridColumn: '2 / 6' }}>
          <AuctionBidder
            address={
              noAuctionHistory ? data?.token?.token?.owner : auctionData.bidder.address
            }
            txHash={auctionData.bidder.txHash}
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            label={noAuctionHistory ? 'Owned by' : 'Winning Bid'}
            showLabels={true}
            align={'flex-end'}
          />
        </Flex>
      )}
      {!isComplete && !noAuctionHistory && (
        <Flex align="center" justify="flex-end">
          {!useModal && <Separator mt="x1" />}
          {timerComplete ? (
            <Label className={placeBidTrigger} as="span" size="md">
              Settle Auction
            </Label>
          ) : (
            <PlaceNounsBid useModal={useModal} />
          )}
        </Flex>
      )}
    </>
  )
}
