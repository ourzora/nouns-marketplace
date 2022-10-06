import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { FillV3AskModal } from '@market/components'
import { FlexProps } from '@zoralabs/zord'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'

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
    <UniversalListAskModal nftObj={nftObj} {...props} />
  )
}
