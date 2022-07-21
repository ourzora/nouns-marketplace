import { Flex, Separator, Label, Stack } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import { TokenInfo } from './TokenInfo'
import {
  auctionWrapperVariants,
  sidebarBidWrapper,
} from '@noun-auction/styles/NounishStyles.css'

export interface ActiveAuctionProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  layout: keyof typeof auctionWrapperVariants['layout']
  useErrorMsg?: boolean
}

export function ActiveAuction({
  useModal,
  showLabels = false,
  /* TokenInfo Props */
  thumbnailSize,
  hideThumbnail,
  hideTitle,
  hideCollectionTitle,
  routePrefix,
  useErrorMsg,
}: ActiveAuctionProps) {
  const {
    isComplete,
    noAuctionHistory,
    daoConfig,
    tokenId,
    timerComplete,
    auctionData,
    layout,
  } = useNounishAuctionProvider()

  if (!auctionData) return null

  const rowLayout = (
    <>
      {!isComplete ? (
        <>
          <AuctionCountdown
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
          />
          <AuctionHighBid
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
          />
          <AuctionBidder
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
          />
        </>
      ) : (
        <Flex h="100%" align="center" justify="flex-end" style={{ gridColumn: '2 / 6' }}>
          <AuctionBidder
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            label={noAuctionHistory ? 'Owned by' : 'Winning Bid'}
            showLabels={true}
            align={'flex-end'}
          />
        </Flex>
      )}
    </>
  )

  const sideBarTop = (
    <Stack mb="x4" gap="x4">
      <AuctionBidder
        showLabels={showLabels}
        layoutDirection="row"
        justify="space-between"
      />
      <AuctionCountdown
        layoutDirection="row"
        showLabels={showLabels}
        justify="space-between"
      />
    </Stack>
  )

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
      {layout !== 'sideBarBid' ? rowLayout : sideBarTop}
      {!isComplete && !noAuctionHistory && (
        <Flex
          align={layout === 'sideBarBid' ? 'flex-start' : 'center'}
          justify="flex-end"
          className={[layout === 'sideBarBid' && sidebarBidWrapper]}
        >
          {layout === 'sideBarBid' && (
            <AuctionHighBid
              layoutDirection="column"
              showLabels={showLabels}
              justify="flex-start"
            />
          )}
          {!useModal && <Separator mt="x1" />}
          {timerComplete ? (
            <SettleAuction useErrorMsg={useErrorMsg} />
          ) : (
            <PlaceNounsBid useModal={useModal} />
          )}
        </Flex>
      )}
    </>
  )
}
