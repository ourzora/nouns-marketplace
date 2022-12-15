import { NFTOffchainOrders } from 'compositions'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeMarket } from 'validators/market'

import { useRelevantMarket } from '@market/hooks'
import { V3AskSidebar } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { useNftMarketContext } from '@media/NFTCard2'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  offchainOrders?: OffchainOrderWithToken[]
  isOwner: boolean
}

export function NFTAsks({ offchainOrders, isOwner }: NFTAskProps) {
  const { markets } = useNftMarketContext()
  const { hasRelevantAsk } = useRelevantMarket(markets)

  const showOffchainOrders = useMemo(
    () => offchainOrders && offchainOrders?.length > 0 && !isOwner,
    [isOwner, offchainOrders]
  )

  if (hasRelevantAsk) {
    return <V3AskSidebar isOwner={isOwner} borderRadius="phat" />
  }

  if (showOffchainOrders) {
    return <NFTOffchainOrders offchainOrders={offchainOrders!} />
  }

  if (isOwner) return <UniversalListAskFlow />

  return null
}
