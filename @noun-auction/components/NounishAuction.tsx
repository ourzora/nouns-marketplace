import { NounishAuctionProvider } from '@noun-auction/providers'
import {
  auctionWrapper,
  auctionWrapperVariants,
  bidHistoryWrapper,
  debugWrapper,
  wrapperHover,
} from '@noun-auction/styles/NounishStyles.css'
import { DaoConfigProps } from '@noun-auction/typings'
import { Accordion, Box, BoxProps, Grid, Separator, Stack } from '@zoralabs/zord'

import { ActiveAuctionRow } from './ActiveAuction/ActiveAuctionRow'
import { AuctionHistory } from './AuctionHistory'
import { AuctionRow } from './AuctionRow'
import { AuctionDebugger } from './Debuggers'

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
  debug?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  showLabels?: boolean
}

export interface NounishAuctionProps extends AuctionViewConfig, BoxProps {
  daoConfig: DaoConfigProps
  tokenId?: string
  /* Theming */
  layout?: keyof typeof auctionWrapperVariants['layout']
}

export function NounishAuction({
  layout = 'row',
  daoConfig,
  tokenId,
  showAuctionRow = true,
  showBidHistory = false,
  showTopBid = true,
  useInlineBid = false,
  hideThumbnail = false,
  hideTitle = false,
  debug = false,
  useErrorMsg = false,
  hideCollectionTitle = false,
  routePrefix = 'collections',
  thumbnailSize = '100%',
  className,
  showLabels,
  ...props
}: NounishAuctionProps) {
  return (
    <Box className={[layout === 'row' && wrapperHover, className]} {...props}>
      <Grid
        className={[
          'nounish-auction__auction-data-wrapper',
          `nounish-auction__${layout}`,
          auctionWrapper({ layout: layout }),
        ]}
      >
        <NounishAuctionProvider daoConfig={daoConfig} tokenId={tokenId} layout={layout}>
          {showAuctionRow && (
            <AuctionRow
              auctionDataComponent={<div>AUCTION DATA</div>}
              activeAuctionComponent={
                <ActiveAuctionRow
                  routePrefix={routePrefix}
                  useModal={!useInlineBid}
                  showLabels={showLabels}
                  showTopBid={showTopBid}
                />
              }
            />
          )}
          {showBidHistory && (
            <AuctionHistory className={bidHistoryWrapper} mb="x2">
              {showAuctionRow && <Separator mt="x4" mb="x3" />}
            </AuctionHistory>
          )}
          {debug && (
            <Stack className={debugWrapper} py="x2" mb="x2">
              <Separator mb="x4" />
              <Accordion label="Api Data">
                <AuctionDebugger />
              </Accordion>
            </Stack>
          )}
        </NounishAuctionProvider>
      </Grid>
    </Box>
  )
}
