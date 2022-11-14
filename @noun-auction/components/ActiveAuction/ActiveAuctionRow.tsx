import Link from 'next/link'

import { useNounishAuctionProvider } from '@noun-auction/providers'
import {
  responsiveRow,
  rowButtonWrapper,
  sidebarBidWrapper,
} from '@noun-auction/styles/NounishStyles.css'
import { Flex, Separator, Stack } from '@zoralabs/zord'

import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import { AuctionBidder, AuctionHighBid, CollectionLink } from '../DataRenderers'
// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { AuctionCountdown } from './AuctionCountdown'
import { RPCTokenInfo } from './RPCTokenInfo'

export interface ActiveAuctionRowProps extends TokenInfoConfig {
  useModal?: boolean
  showLabels?: boolean
  useErrorMsg?: boolean
  /* View Config */
  showTopBid?: boolean
}

export function ActiveAuctionRow({
  useModal,
  showLabels,
  useErrorMsg,
}: ActiveAuctionRowProps) {
  const { daoConfig, tokenId, timerComplete, layout } = useNounishAuctionProvider()

  const rowLayout = (
    <>
      <Link href={`collections/${daoConfig.contractAddress}`} passHref>
        <AuctionCountdown
          layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
          showLabels={showLabels}
          justify={'center'}
          align={'flex-end'}
          className={[layout === 'row' && responsiveRow, 'nounish-auction__countdown']}
          cursor="pointer"
        />
      </Link>
      <Link href={`collections/${daoConfig.contractAddress}`} passHref>
        <AuctionHighBid
          layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
          showLabels={showLabels}
          justify={'center'}
          align={'flex-end'}
          className={[layout === 'row' && responsiveRow, 'nounish-auction__high-bid']}
          cursor="pointer"
        />
      </Link>
      <Link href={`collections/${daoConfig.contractAddress}`} passHref>
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
      />
      <AuctionCountdown
        layoutDirection="row"
        showLabels={showLabels}
        justify="space-between"
        className="nounish-auction__sidebar-top-countdown"
      />
    </Stack>
  )

  return (
    <>
      {layout !== 'sideBarBid' && (
        <Link href={`collections/${daoConfig.contractAddress}`} passHref>
          <RPCTokenInfo
            tokenId={tokenId}
            contractAddress={daoConfig?.contractAddress}
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
            contractAddress={daoConfig?.contractAddress}
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
          <PlaceNounsBid useModal={useModal} />
        )}
      </Flex>
    </>
  )
}
