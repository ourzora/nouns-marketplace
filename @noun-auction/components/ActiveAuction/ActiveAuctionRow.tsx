import Link from 'next/link'
import { TokenContentMedia } from 'types/zora.api.generated'

import { useMemo } from 'react'

import {
  auctionWrapperVariants,
  responsiveRow,
  rowButtonWrapper,
  sidebarBidWrapper,
} from '@noun-auction/styles/NounishStyles.css'
import { Flex, Separator, Stack } from '@zord'

import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import { AuctionBidder, AuctionHighBid, CollectionLink } from '../DataRenderers'
import { AuctionCountdown } from './AuctionCountdown'
import { RPCTokenInfo } from './RPCTokenInfo'

export interface ActiveAuctionRowProps {
  tokenId: string
  collectionAddress: string
  auctionCompleted: boolean
  auctionEndTime: string
  highestBid: string
  highestBidder?: string
  auctionContractAddress: string
  minBidIncrementPercentage: number
  routePrefix?: string
  useModal?: boolean
  showLabels?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  layout?: keyof typeof auctionWrapperVariants['layout']
  tokenImage: TokenContentMedia | undefined
  collectionName?: string
}

export function ActiveAuctionRow({
  useModal,
  showLabels,
  useErrorMsg,
  layout,
  tokenId,
  collectionAddress,
  auctionCompleted,
  highestBid,
  highestBidder,
  auctionContractAddress,
  auctionEndTime,
  tokenImage,
  collectionName,
}: ActiveAuctionRowProps) {
  const rowLayout = useMemo(
    () => (
      <>
        <Link href={`collections/${collectionAddress}`} passHref>
          <AuctionCountdown
            auctionEndTime={auctionEndTime}
            auctionCompleted={auctionCompleted}
            direction={'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={!!showLabels}
            justify="center"
            align="flex-end"
            cursor="pointer"
            className={['nounish-auction__countdown'].concat(
              layout === 'row' ? responsiveRow : []
            )}
          />
        </Link>
        <Link href={`collections/${collectionAddress}`} passHref>
          <AuctionHighBid
            auctionCompleted={auctionCompleted}
            highestBid={highestBid}
            collectionAddress={collectionAddress}
            layout={layout!}
            direction={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            justify="center"
            align="flex-end"
            cursor="pointer"
            showLabels={showLabels}
            className={[layout === 'row' && responsiveRow, 'nounish-auction__high-bid']}
          />
        </Link>
        <Link href={`collections/${collectionAddress}`} passHref>
          <Flex
            position="relative"
            h="100%"
            align="center"
            w="100%"
            justify="flex-end"
            cursor="pointer"
          >
            <AuctionBidder
              highestBidder={highestBidder}
              layout="row"
              direction={layout === 'row' || 'withHistory' ? 'column' : 'row'}
              showLabels={showLabels}
              justify="center"
              align={'flex-end'}
              className="nounish-auction__bidder"
            />
          </Flex>
        </Link>
      </>
    ),
    [
      auctionCompleted,
      auctionEndTime,
      collectionAddress,
      highestBid,
      highestBidder,
      layout,
      showLabels,
    ]
  )

  const sideBarTop = useMemo(
    () => (
      <Stack mb="x4" gap="x4">
        <AuctionBidder
          highestBidder={highestBidder}
          showLabels={showLabels}
          direction="row"
          layout="sideBarBid" // check this
          justify="space-between"
          className="nounish-auction__sidebar-top-bidder"
        />
        <AuctionCountdown
          auctionCompleted={auctionCompleted}
          auctionEndTime={auctionEndTime}
          direction="row"
          showLabels={showLabels}
          justify="space-between"
          className={['nounish-auction__sidebar-top-contdown']}
        />
      </Stack>
    ),
    [auctionCompleted, auctionEndTime, highestBidder, showLabels]
  )

  return (
    <>
      {layout !== 'sideBarBid' && (
        <Link href={`collections/${collectionAddress}`} passHref>
          <RPCTokenInfo
            collectionName={collectionName}
            tokenImage={tokenImage?.url ?? undefined}
            tokenId={tokenId}
            collectionAddress={collectionAddress}
            cursor="pointer"
          />
        </Link>
      )}
      {layout !== 'sideBarBid' ? rowLayout : sideBarTop}
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
            auctionCompleted={auctionCompleted}
            layout={layout}
            highestBid={highestBid}
            collectionAddress={collectionAddress}
            direction="column"
            justify="space-around"
            showLabels={showLabels}
          />
        )}
        {layout === 'row' && (
          <CollectionLink
            collectionAddress={collectionAddress}
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
        {auctionCompleted ? (
          <SettleAuction
            auctionContractAddress={auctionContractAddress}
            layout={layout === 'sideBarBid' ? 'row' : 'historyOnly'}
            useErrorMsg={useErrorMsg}
            className="nounish-auction__row-link"
          />
        ) : (
          <PlaceNounsBid
            layout={layout === 'sideBarBid' ? 'row' : 'historyOnly'}
            tokenId={tokenId}
            collectionAddress={collectionAddress}
            useModal={useModal}
          />
        )}
      </Flex>
    </>
  )
}
