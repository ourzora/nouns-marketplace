import { TypeSafeToken } from 'validators/token'

import { FillV3AskModal } from '@market/components'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { FlexProps } from '@zoralabs/zord'

export interface NFTCardMarketProps extends FlexProps {
  token: TypeSafeToken
}

export function NFTCardMarket({ token, ...props }: NFTCardMarketProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { hasRelevantAsk } = useAskHelper({ ask })

  if (!nftObj) return null

  return hasRelevantAsk ? (
    <FillV3AskModal nftObj={nftObj} {...props} />
  ) : (
    <UniversalListAskModal nftObj={nftObj} {...props} />
  )
}
