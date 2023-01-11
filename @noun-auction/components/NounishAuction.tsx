import { ClassValue } from 'clsx'

import { useToken } from 'hooks/useToken'

import { useEffect, useMemo, useState } from 'react'
import { TypeSafeDao } from 'validators/dao'

import { useNounishAuctionQuery } from '@noun-auction'
import {
  auctionWrapper,
  auctionWrapperVariants,
  wrapperHover,
} from '@noun-auction/styles/NounishStyles.css'
import { useInterval } from '@shared'
import { Box, BoxProps, Grid } from '@zord'

import { ActiveAuctionRow } from './ActiveAuction/ActiveAuctionRow'

export interface TokenInfoConfig extends BoxProps {
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '100%'
  routePrefix?: string
}

export interface AuctionViewConfig extends TokenInfoConfig {
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
  dao,
  layout = 'row',
  showBidHistory = false,
  showTopBid = true,
  ...props
}: NounishAuctionProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: dao.collectionAddress,
  })

  const [auctionCompleted, setAuctionCompleted] = useState(false)
  const ttl = useMemo(
    () => (activeAuction ? Date.now() - parseInt(activeAuction.endTime) * 1000 : 0),
    [activeAuction]
  )

  useInterval(() => setAuctionCompleted(ttl > 0), ttl > 0 ? ttl : 0)

  useEffect(() => {
    if (activeAuction?.winner) setAuctionCompleted(true)
  }, [activeAuction?.winner])

  if (activeAuction) {
    const highestBid = activeAuction?.highestBidPrice?.nativePrice?.raw || '0'
    const {
      minBidIncrementPercentage,
      highestBidder,
      tokenId,
      collectionAddress,
      address: auctionContractAddress,
      endTime: auctionEndTime,
      startTime: auctionStartTime,
    } = activeAuction

    return (
      <NounishAuctionComponent
        auctionCompleted={auctionCompleted}
        minBidIncrementPercentage={minBidIncrementPercentage}
        highestBid={highestBid}
        highestBidder={highestBidder}
        tokenId={tokenId}
        collectionAddress={collectionAddress}
        auctionContractAddress={auctionContractAddress}
        auctionStartTime={auctionStartTime}
        auctionEndTime={auctionEndTime}
        {...props}
      />
    )
  }

  return null
}

type NounishAuctionComponentProps = {
  layout?: 'row' | 'historyOnly' | 'withHistory' | 'sideBarBid'
  showBidHistory?: boolean
  showTopBid?: boolean
  useInlineBid?: boolean
  hideThumbnail?: boolean
  hideTitle?: boolean
  useErrorMsg?: boolean
  hideCollectionTitle?: boolean
  routePrefix?: string
  thumbnailSize?: string
  className?: ClassValue | null
  showLabels?: boolean
  tokenId: string
  auctionStartTime: string
  auctionEndTime: string
  collectionAddress: string
  auctionContractAddress: string
  auctionCompleted: boolean
  minBidIncrementPercentage: number
  highestBid: string
  highestBidder?: string
}

export function NounishAuctionComponent({
  layout = 'row',
  useInlineBid = false,
  className,
  ...rest
}: NounishAuctionComponentProps) {
  const { token } = useToken({
    collectionAddress: rest.collectionAddress,
    tokenId: rest.tokenId,
  })

  return (
    <Box className={[layout === 'row' && wrapperHover, className]}>
      <Grid
        className={[
          'nounish-auction__auction-data-wrapper',
          `nounish-auction__${layout}`,
          auctionWrapper({ layout }),
        ]}
      >
        <ActiveAuctionRow
          layout={layout}
          collectionName={token?.collectionName}
          tokenName={token?.name}
          tokenImage={token?.image}
          {...rest}
          enableModal={!useInlineBid}
        />
      </Grid>
    </Box>
  )
}
