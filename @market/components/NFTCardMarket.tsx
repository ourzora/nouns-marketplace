import { FillV3AskModal } from '@market/components'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { FlexProps } from '@zoralabs/zord'

export interface NFTCardMarketProps extends FlexProps {
  nftObj: NFTObject
}

export function NFTCardMarket({ nftObj, ...props }: NFTCardMarketProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { hasRelevantAsk } = useAskHelper({ ask })

  if (!nftObj) return null

  return hasRelevantAsk ? (
    <FillV3AskModal nftObj={nftObj} {...props} />
  ) : (
    <UniversalListAskFlow nftObj={nftObj} {...props} />
  )
}
