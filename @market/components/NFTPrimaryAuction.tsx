import { NFTOffchainOrders } from 'compositions'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { FillV3AskModal } from '@market/components/FillV3AskModal'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps } from '@zoralabs/zord'

import { NFTPrimaryAuctionActive } from './NFTPrimaryAuctionActive'

export interface NFTPrimaryAuctionProps extends FlexProps {
  // nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuction({
  // nftObj,
  primaryAuction,
  ...props
}: NFTPrimaryAuctionProps) {
  // const { markets } = nftObj
  // const { ask } = useRelevantMarket(markets)
  // const { isOwner } = useIsOwner(nftObj)
  const { hasWinner, winnerAddress, highestBidPrice, isEnded } = useNounishAuctionHelper({
    auction: primaryAuction,
  })
  // const { hasRelevantAsk, isPrivateAsk } = useAskHelper({ ask })

  console.log('PRIMARY', primaryAuction)

  if (!primaryAuction) return null

  // if (isEnded) {
  //   return <Box>AUCTION HAS ENDED, REPLACE ME</Box>
  //   // 1. claim: if you're the bidder
  //   // 2. otherwise: show the active auction amount before it's claimed
  // }

  return <NFTPrimaryAuctionActive primaryAuction={primaryAuction} />

  // return <Box>I AM AN UNENDED PRIMARY AUCTION</Box> // show sidebar panel with: active price / countdown + Place Bid button
  // return <Box>I AM AN UNENDED PRIMARY AUCTION</Box> // show sidebar panel with: active price / countdown + Place Bid button
}
