import { NFTOffchainOrders } from 'compositions'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { V3AskSidebar } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  nftObj: NFTObject
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTAsks({ nftObj, offchainOrders, ...props }: NFTAskProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { isOwner } = useIsOwner(nftObj)
  const {
    hasRelevantAsk,
    // , isPrivateAsk
  } = useAskHelper({ ask })
  const showOffchainOrders = useMemo(
    () => offchainOrders && offchainOrders?.length > 0 && !isOwner,
    [isOwner, offchainOrders]
  )

  if (hasRelevantAsk) {
    console.log('RELEVANT ASK')
    return <V3AskSidebar nftObj={nftObj} borderRadius="phat" />
  }

  if (showOffchainOrders) {
    console.log('HAS OFFCHAIN')
    return <NFTOffchainOrders nft={nftObj} offchainOrders={offchainOrders!} />
  }

  console.log('IS OWNER?')
  if (isOwner) return <UniversalListAskFlow nftObj={nftObj} />

  return null
}
