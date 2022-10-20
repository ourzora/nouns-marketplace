import { Flex, Separator, Stack, Box } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { AuctionBidder, AuctionHighBid, CollectionLink } from '../DataRenderers'
import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import {
  responsiveRow,
  sidebarBidWrapper,
  rowButtonWrapper,
  auctionWrapperVariants,
} from '@noun-auction/styles/NounishStyles.css'

import { AuctionCountdown } from './AuctionCountdown'
import { RPCTokenInfo } from './RPCTokenInfo'
import Link from 'next/link'
import { NounsBuilderAuction } from 'types/zora.api.generated'

export interface ActiveAuctionRowProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  layout?: keyof typeof auctionWrapperVariants['layout']
  activeAuction: NounsBuilderAuction
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
          showLabels={showLabels}
          justify={'center'}
          align={'flex-end'}
          className={[layout === 'row' && responsiveRow, 'nounish-auction__countdown']}
          cursor="pointer"
          activeAuction={activeAuction}
        />
      </Link>
      <Link href={`collections/${collectionAddress}`} passHref>
        <AuctionHighBid
          layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
          showLabels={showLabels}
          justify={'center'}
          align={'flex-end'}
          className={[layout === 'row' && responsiveRow, 'nounish-auction__high-bid']}
          cursor="pointer"
          activeAuction={activeAuction}
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
            layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
            showLabels={showLabels}
            justify={'center'}
            align={'flex-end'}
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
        justify="space-between"
        className="nounish-auction__sidebar-top-bidder"
        activeAuction={activeAuction}
      />
      <AuctionCountdown
        layoutDirection="row"
        showLabels={showLabels}
        justify="space-between"
        className="nounish-auction__sidebar-top-contdown"
        activeAuction={activeAuction}
      />
    </Stack>
  )

  return (
    <>
      {layout !== 'sideBarBid' && (
        <Link href={`collections/${collectionAddress}`} passHref>
          <RPCTokenInfo
            tokenId={tokenId}
            contractAddress={collectionAddress}
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
            layoutDirection="column"
            showLabels={showLabels}
            justify="flex-start"
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
            useErrorMsg={useErrorMsg}
            className="nounish-auction__row-link"
          />
        ) : (
          <PlaceNounsBid
            layout={layout!}
            activeAuction={activeAuction}
            useModal={useModal}
          />
        )}
      </Flex>
    </>
  )
}
