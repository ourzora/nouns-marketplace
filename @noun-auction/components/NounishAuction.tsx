import { NounsDao } from 'types/zora.api.generated'

import { isAfter } from 'date-fns'

import { useNounishAuctionQuery } from '@noun-auction'
import { NounishAuctionProvider } from '@noun-auction/providers'
import {
  auctionWrapper,
  auctionWrapperVariants,
  wrapperHover,
} from '@noun-auction/styles/NounishStyles.css'
import { Box, BoxProps, Grid, Separator, Stack } from '@zoralabs/zord'

import { ActiveAuctionRow } from './ActiveAuction/ActiveAuctionRow'
import { AuctionRow } from './AuctionRow'

export interface TokenInfoConfig extends BoxProps {
  /* ~ Move to provider as config object */
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '100%'
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
  className,
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
    <Box className={[layout === 'row' && wrapperHover, className]} {...props}>
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
              {/* FIXME ! cast */}
              <AuctionRow
                tokenId={tokenId!}
                activeAuctionId={activeNounishAuction.auction}
                name={dao.name!}
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
