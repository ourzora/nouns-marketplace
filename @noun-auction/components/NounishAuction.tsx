import { Accordion, Separator, Stack, BoxProps, Grid } from '@zoralabs/zord'
import { NounishAuctionProvider } from '@noun-auction/providers'
import { ActiveAuction } from './ActiveAuction'
import { AuctionHistory } from './AuctionHistory'
import { AuctionDebugger } from './Debuggers'
import {
  auctionWrapper,
  auctionWrapperVariants,
  bidHistoryWrapper,
  debugWrapper,
} from '@noun-auction/styles/NounishStyles.css'
import { DaoConfigProps } from '@noun-auction/typings'

export interface TokenInfoConfig extends BoxProps {
  /* ~ Move to provider as config object */
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | '100%' | undefined
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

export interface NounishAuctionProps extends AuctionViewConfig {
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
  showLabels = false,
  ...props
}: NounishAuctionProps) {
  return (
    <Grid
      className={[
        'nounish-auction__auction-data-wrapper',
        `nounish-auction__${layout}`,
        auctionWrapper({ layout: layout }),
      ]}
      {...props}
    >
      <NounishAuctionProvider daoConfig={daoConfig} tokenId={tokenId} layout={layout}>
        {showAuctionRow && (
          <ActiveAuction
            layout={layout}
            hideThumbnail={hideThumbnail}
            hideTitle={hideTitle}
            hideCollectionTitle={hideCollectionTitle}
            thumbnailSize={thumbnailSize}
            routePrefix={routePrefix}
            useModal={!useInlineBid}
            showLabels={showLabels}
            useErrorMsg={useErrorMsg}
            showTopBid={showTopBid}
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
  )
}
