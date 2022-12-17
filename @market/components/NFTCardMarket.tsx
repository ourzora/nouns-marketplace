import { useRelevantMarket } from '@market/hooks'
import { V3AskModal } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { useNftMarketContext } from '@market/providers/NftMarketContextProvider'
import { FlexProps } from '@zoralabs/zord'

import { NFTCardMarketOwner } from './NFTCardMarketOwner'

export interface NFTCardMarketProps extends FlexProps {
  isOwner?: boolean
  ownerAddress?: string
}

export function NFTCardMarket({ isOwner, ownerAddress, ...props }: NFTCardMarketProps) {
  const { markets } = useNftMarketContext()
  const { hasRelevantAsk } = useRelevantMarket(markets)

  if (hasRelevantAsk) {
    return <V3AskModal isOwner={false} modalName="V3AskV3" />
  }

  if (isOwner) {
    return <UniversalListAskFlow {...props} />
  }

  return <NFTCardMarketOwner size="md" address={ownerAddress} />
}
