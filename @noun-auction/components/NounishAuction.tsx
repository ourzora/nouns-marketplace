import { Separator, Stack, BoxProps, Grid, Box } from '@zoralabs/zord'
import { NounishAuctionProvider } from '@noun-auction/providers'
import { AuctionHistory } from './AuctionHistory'
import { AuctionRow } from './AuctionRow'
import { ActiveAuctionRow } from './ActiveAuction/ActiveAuctionRow'
import {
  auctionWrapper,
  auctionWrapperVariants,
  bidHistoryWrapper,
  wrapperHover,
} from '@noun-auction/styles/NounishStyles.css'
import { NounsBuilderAuction, NounsDao } from 'types/zora.api.generated'
import { useNounishAuctionQuery } from '@noun-auction'
import { isAfter } from 'date-fns'

export interface TokenInfoConfig extends BoxProps {
  /* ~ Move to provider as config object */
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '100%' | undefined
  routePrefix?: string
}

export interface AuctionViewConfig extends TokenInfoConfig {
  /* View Config ~ Move to provider as config object */
  showAuctionRow?: boolean
  showBidHistory?: boolean
  useInlineBid?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  showLabels?: boolean
}

export interface NounishAuctionProps extends AuctionViewConfig {
  dao: NounsDao
  tokenId?: string
  layout?: keyof typeof auctionWrapperVariants['layout']
}

export function NounishAuction({
  layout = 'row',
  dao,
  tokenId,
  showAuctionRow = true,
  showBidHistory = false,
  showTopBid = true,
  useInlineBid = false,
  hideThumbnail = false,
  hideTitle = false,
  useErrorMsg = false,
  hideCollectionTitle = false,
  routePrefix = 'collections',
  thumbnailSize = '100%',
  showLabels,
  ...props
}: NounishAuctionProps) {
  const { activeNounishAuction } = useNounishAuctionQuery({
    collectionAddress: dao.collectionAddress,
  })
  const timerComplete = activeNounishAuction
    ? isAfter(parseInt(activeNounishAuction.endTime), Date.now() * 1000)
    : false

  return (
    <Box
      key={dao.collectionAddress}
      className={layout === 'row' && wrapperHover}
      {...props}
    >
      <Grid
        className={[
          'nounish-auction__auction-data-wrapper',
          `nounish-auction__${layout}`,
          auctionWrapper({ layout: layout }),
        ]}
      >
        <NounishAuctionProvider dao={dao} tokenId={tokenId} layout={layout}>
          {showAuctionRow && activeNounishAuction && (
            <>
              <AuctionRow
                auctionDataComponent={<div>AUCTION DATA</div>}
                activeAuctionComponent={
                  <ActiveAuctionRow
                    timerComplete={timerComplete}
                    layout={layout}
                    activeAuction={activeNounishAuction}
                    routePrefix={routePrefix}
                    useModal={!useInlineBid}
                    showLabels={showLabels}
                    showTopBid={showTopBid}
                  />
                }
              />
            </>
          )}
          {/* {showBidHistory && (
            <AuctionHistory
              dao={dao}
              noAuctionHistory={noAuctionHistory}
              className={bidHistoryWrapper}
              mb="x2"
            >
              {showAuctionRow && <Separator mt="x4" mb="x3" />}
            </AuctionHistory>
          )} */}
        </NounishAuctionProvider>
      </Grid>
    </Box>
  )
}
