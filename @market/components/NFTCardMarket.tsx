import { useMemo } from 'react'
import {
  MARKET_INFO_STATUSES,
  NFTObject,
} from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { ListV3AskModal, FillV3AskModal } from '@market/components'
import { FlexProps } from '@zoralabs/zord'

export interface NFTCardMarketProps extends FlexProps {
  nftObj: NFTObject
}

export function NFTCardMarket({ nftObj, ...props }: NFTCardMarketProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { hasAsk, isCompletedAsk, isActiveAsk } = useAskHelper({ ask })
  const hasRelevantAsk = useMemo(
    () => hasAsk && (isCompletedAsk || isActiveAsk),
    [hasAsk, isActiveAsk, isCompletedAsk]
  )

  const marketComponent = useMemo(
    () =>
      hasRelevantAsk ? (
        <FillV3AskModal nftObj={nftObj} {...props} />
      ) : (
        <ListV3AskModal nftObj={nftObj} {...props} />
      ),
    [hasRelevantAsk, nftObj, props]
  )

  return nftObj ? marketComponent : null
}
