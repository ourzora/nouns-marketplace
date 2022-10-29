import Link from 'next/link'

import { TypeSafeNounsAuction } from 'validators/auction'

import {
  auctionWrapperVariants,
  responsiveRow,
  rowButtonWrapper,
  sidebarBidWrapper,
} from '@noun-auction/styles/NounishStyles.css'
import { Flex, Separator, Stack } from '@zoralabs/zord'

import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import { AuctionBidder, AuctionHighBid, CollectionLink } from '../DataRenderers'
import { TokenInfoConfig } from '../NounishAuction'
import { AuctionCountdown } from './AuctionCountdown'
import { RPCTokenInfo } from './RPCTokenInfo'

export interface ActiveAuctionRowProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  layout?: keyof typeof auctionWrapperVariants['layout']
  activeAuction: TypeSafeNounsAuction
  timerComplete: boolean
}

export function ActiveAuctionRow({
  useModal,
  showLabels,
  useErrorMsg,
  layout,
  activeAuction,
  timerComplete,
}: ActiveAuctionRowProps) {
  const { tokenId, collectionAddress } = activeAuction

  const rowLayout = (
    <>
      <Link href={`collections/${collectionAddress}`} passHref>
        <AuctionCountdown
          layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
          showLabels={!!showLabels}
          startTime={activeAuction.startTime}
          endTime={activeAuction.endTime}
          styles={{
            justify: 'center',
            align: 'flex-end',
            cursor: 'pointer',
          }}
          className={['nounish-auction__countdown'].concat(
            layout === 'row' ? responsiveRow : []
          )}
        />
      </Link>
      <Link href={`collections/${collectionAddress}`} passHref>
        <AuctionHighBid
          highestBid={activeAuction.highestBidPrice?.nativePrice?.raw}
          collectionAddress={activeAuction.collectionAddress}
          layout={layout!}
          styles={{
            layoutDirection: layout === 'row' || 'withHistory' ? 'column' : 'row',
            justify: 'center',
            align: 'flex-end',
            cursor: 'pointer',
          }}
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
            layout="sideBarBid" // check this
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            styles={{
              justify: 'center',
              align: 'flex-end',
            }}
            className="nounish-auction__bidder"
            activeAuction={activeAuction}
          />
        </Flex>
      </Link>
    </>
  )

  const sideBarTop = (
    <Stack mb="x4" gap="x4">
      <AuctionBidder
        showLabels={showLabels}
        layoutDirection="row"
        layout="sideBarBid" // check this
        styles={{
          justify: 'space-between',
        }}
        className="nounish-auction__sidebar-top-bidder"
        activeAuction={activeAuction}
      />
      <AuctionCountdown
        layoutDirection="row"
        showLabels={showLabels}
        styles={{
          justify: 'space-between',
        }}
        className={['nounish-auction__sidebar-top-contdown']}
        startTime={activeAuction.startTime}
        endTime={activeAuction.endTime}
      />
    </Stack>
  )

  return (
    <>
      {layout !== 'sideBarBid' && (
        <Link href={`collections/${collectionAddress}`} passHref>
          <RPCTokenInfo
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
            layout={layout}
            highestBid={activeAuction.highestBidPrice?.nativePrice?.raw}
            collectionAddress={activeAuction.collectionAddress}
            styles={{
              layoutDirection: 'column',
              justify: 'flex-start',
            }}
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
        {timerComplete ? (
          <SettleAuction
            auctionContractAddress={activeAuction.address}
            layout={layout!}
            useErrorMsg={useErrorMsg}
            className="nounish-auction__row-link"
          />
        ) : (
          <PlaceNounsBid
            layout={layout!}
            tokenId={tokenId}
            collectionAddress={collectionAddress}
            useModal={useModal}
          />
        )}
      </Flex>
    </>
  )
}
