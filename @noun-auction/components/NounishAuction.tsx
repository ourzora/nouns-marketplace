import { ClassValue } from 'clsx'

import { useToken } from 'hooks/useToken'

import { useEffect, useState } from 'react'
import { TypeSafeDao } from 'validators/dao'

import { useNounishAuctionQuery } from '@noun-auction'
import {
  auctionWrapper,
  auctionWrapperVariants,
  bidHistoryWrapper,
  wrapperHover,
} from '@noun-auction/styles/NounishStyles.css'
import { useInterval } from '@shared'
import { Box, BoxProps, Grid, Separator } from '@zoralabs/zord'

import { ActiveAuctionRow } from './ActiveAuction/ActiveAuctionRow'
import { AuctionHistory } from './AuctionHistory'

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

export function NounishAuction({ dao, ...props }: NounishAuctionProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: dao.collectionAddress,
  })

  const [auctionCompleted, setAuctionCompleted] = useState(false)
  const ttl = activeAuction ? Date.now() - parseInt(activeAuction.endTime) * 1000 : 0

  useInterval(
    () => {
      ttl > 0 ? setAuctionCompleted(true) : setAuctionCompleted(false)
    },
    ttl > 0 ? ttl : 0
  )

  useEffect(() => {
    if (activeAuction?.winner) setAuctionCompleted(true)
  }, [activeAuction?.winner])

  if (activeAuction) {
    const minBidIncrementPercentage = activeAuction?.minBidIncrementPercentage
    const highestBid = activeAuction?.highestBidPrice?.nativePrice?.raw || '0'
    const highestBidder = activeAuction?.highestBidder
    const tokenId = activeAuction?.tokenId
    const collectionAddress = activeAuction?.collectionAddress
    const auctionContractAddress = activeAuction?.address
    const auctionEndTime = activeAuction?.endTime

    return (
      <NounishAuctionComponent
        auctionCompleted={auctionCompleted}
        minBidIncrementPercentage={minBidIncrementPercentage}
        highestBid={highestBid}
        highestBidder={highestBidder}
        tokenId={tokenId}
        collectionAddress={collectionAddress}
        auctionContractAddress={auctionContractAddress}
        auctionEndTime={auctionEndTime}
        {...props}
      />
    )
  } else {
    return null
  }
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
          collectionName={token?.name}
          tokenImage={token?.image}
          {...rest}
          useModal={!useInlineBid}
        />
        {showBidHistory && (
          <AuctionHistory className={bidHistoryWrapper} mb="x2">
            <Separator mt="x4" mb="x3" />
          </AuctionHistory>
        )}
      </Grid>
    </Box>
  )
}
