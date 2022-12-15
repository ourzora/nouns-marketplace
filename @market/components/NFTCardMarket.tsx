import { NFTOwner } from '@market/components'
import { useRelevantMarket } from '@market/hooks'
import { V3AskModal } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { useNftMarketContext } from '@media/NFTCard2'
import { FlexProps } from '@zoralabs/zord'

export interface NFTCardMarketProps extends FlexProps {
  isOwner?: boolean
  ownerAddress?: string
}

export function NFTCardMarket({ isOwner, ownerAddress, ...props }: NFTCardMarketProps) {
  const { markets } = useNftMarketContext()
  const { hasRelevantAsk } = useRelevantMarket(markets)

  if (isOwner) {
    return <UniversalListAskFlow {...props} />
  }

  if (hasRelevantAsk) {
    return <V3AskModal isOwner={false} modalName="V3AskV3" />
  }

  return <NFTOwner size="md" align="left" address={ownerAddress} />
}
