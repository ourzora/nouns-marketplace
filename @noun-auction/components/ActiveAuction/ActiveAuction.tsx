import { Flex, Separator, Stack } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import {
  AuctionCountdown,
  AuctionBidder,
  AuctionHighBid,
  TokenInfo,
  CollectionLink,
} from '../DataRenderers'
import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import {
  auctionWrapperVariants,
  responsiveRow,
  sidebarBidWrapper,
  rowButtonWrapper,
} from '@noun-auction/styles/NounishStyles.css'

export interface ActiveAuctionProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  layout: keyof typeof auctionWrapperVariants['layout']
  useErrorMsg?: boolean
  /* View Config */
  showTopBid?: boolean
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
  showTopBid,
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

  if (!auctionData || !tokenId) return null

  const rowLayout = (
    <>
      {!isComplete ? (
        <>
          <AuctionCountdown
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
            className={[layout === 'row' && responsiveRow, 'nounish-auction__countdown']}
          />
          <AuctionHighBid
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
            className={[layout === 'row' && responsiveRow, 'nounish-auction__high-bid']}
          />
          {showTopBid && (
            <AuctionBidder
              layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
              showLabels={showLabels}
              justify={'center'}
              align={'flex-end'}
              className="nounish-auction__bidder"
            />
          )}
        </>
      ) : (
        <Flex h="100%" align="center" justify="flex-end" style={{ gridColumn: '2 / 6' }}>
          <AuctionBidder
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            label={noAuctionHistory ? 'Owned by' : 'Winning Bid'}
            showLabels={true}
            align={'flex-end'}
            className="nounish-auction__complete-bidder"
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
        className="nounish-auction__sidebar-top-bidder"
      />
      <AuctionCountdown
        layoutDirection="row"
        showLabels={showLabels}
        justify="space-between"
        className="nounish-auction__sidebar-top-contdown"
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
          gap="x4"
          w={{
            '@initial': layout === 'row' ? '100%' : 'auto',
            '@1024': 'auto',
          }}
          className={[
            layout === 'sideBarBid' && sidebarBidWrapper,
            layout === 'row' && rowButtonWrapper,
          ]}
        >
          {layout === 'sideBarBid' && (
            <AuctionHighBid
              layoutDirection="column"
              showLabels={showLabels}
              justify="flex-start"
            />
          )}
          {layout === 'row' && (
            <CollectionLink
              contractAddress={daoConfig?.contractAddress}
              className="nounish-auction__row-link"
              display={{
                '@initial': 'block',
                '@1024': 'none',
              }}
            >
              View Collection
            </CollectionLink>
          )}
          {!useModal && <Separator mt="x1" />}
          {timerComplete ? (
            <SettleAuction
              useErrorMsg={useErrorMsg}
              className="nounish-auction__row-link"
            />
          ) : (
            <PlaceNounsBid useModal={useModal} />
          )}
        </Flex>
      )}
    </>
  )
}
