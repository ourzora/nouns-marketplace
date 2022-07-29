import { Flex, Separator, Stack } from '@zoralabs/zord'

// @noun-auction
import { TokenInfoConfig } from '../NounishAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import {
  AuctionBidder,
  AuctionHighBid,
  TokenInfo,
  CollectionLink,
} from '../DataRenderers'
import { PlaceNounsBid, SettleAuction } from '../AuctionUi'
import {
  responsiveRow,
  sidebarBidWrapper,
  rowButtonWrapper,
} from '@noun-auction/styles/NounishStyles.css'

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
      <AuctionCountdown
        layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
        showLabels={showLabels}
        justify={'center'}
        align={'flex-end'}
        className={[layout === 'row' && responsiveRow, 'nounish-auction__countdown']}
      />
      <AuctionHighBid
        layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
        showLabels={showLabels}
        justify={'center'}
        align={'flex-end'}
        className={[layout === 'row' && responsiveRow, 'nounish-auction__high-bid']}
      />
      <AuctionBidder
        layoutDirection={layout === 'row' || 'withHistory' ? 'column' : 'row'}
        showLabels={showLabels}
        justify={'center'}
        align={'flex-end'}
        className="nounish-auction__bidder"
      />
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
        className="nounish-auction__sidebar-top-contdown"
      />
    </Stack>
  )

  return (
    <>
      {layout !== 'sideBarBid' && (
        <RPCTokenInfo tokenId={tokenId} contractAddress={daoConfig?.contractAddress} />
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
