import { isAfter } from 'date-fns'
import { isBefore } from 'date-fns'

import { TypeSafeDao } from 'validators/dao'

import { useCountdown, useNounishAuctionQuery } from '@noun-auction'
import {
  auctionWrapper,
  auctionWrapperVariants,
  bidHistoryWrapper,
  wrapperHover,
} from '@noun-auction/styles/NounishStyles.css'
import { Box, BoxProps, Grid, Separator } from '@zoralabs/zord'

import { ActiveAuctionRow } from './ActiveAuction/ActiveAuctionRow'
import { AuctionHistory } from './AuctionHistory'

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
  dao: TypeSafeDao
  layout?: keyof typeof auctionWrapperVariants['layout']
}

export function NounishAuction({
  layout = 'row',
  dao,
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
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: dao.collectionAddress,
  })

  // const { isEnded: auctionCompleted } = useCountdown(
  //   activeAuction?.startTime,
  //   activeAuction?.endTime
  // )

  // FIXME: non-memoized version
  const endTime = parseInt(activeAuction?.endTime || '0') * 1000
  const now = Date.now()
  const auctionCompleted = endTime ? now > endTime : false

  if (!activeAuction) {
    return null
  }

  return (
    <Box className={[layout === 'row' && wrapperHover, className]} {...props}>
      <Grid
        className={[
          'nounish-auction__auction-data-wrapper',
          `nounish-auction__${layout}`,
          auctionWrapper({ layout: layout }),
        ]}
      >
        {showAuctionRow && activeAuction && (
          <ActiveAuctionRow
            timerComplete={auctionCompleted}
            layout={layout}
            activeAuction={activeAuction}
            routePrefix={routePrefix}
            useModal={!useInlineBid}
            showLabels={showLabels}
            showTopBid={showTopBid}
          />
        )}
        {showBidHistory && (
          <AuctionHistory className={bidHistoryWrapper} mb="x2">
            {showAuctionRow && <Separator mt="x4" mb="x3" />}
          </AuctionHistory>
        )}
      </Grid>
    </Box>
  )
}
