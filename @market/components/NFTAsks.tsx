import { useMemo } from 'react'

import { FillV3AskModal } from '@market/components/FillV3AskModal'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { V3AskSidebar } from '@market/modules/V3Ask'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  nftObj: NFTObject
}

export function NFTAsks({ nftObj, ...props }: NFTAskProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { isOwner } = useIsOwner(nftObj)
  const { hasRelevantAsk, isPrivateAsk } = useAskHelper({ ask })

  console.log('ASK')

  const marketComponent = useMemo(() => {
    if (hasRelevantAsk) {
      return isPrivateAsk ? (
        // <PrivateAskSidebar nftObj={nftObj} borderRadius="phat" />
        <V3AskSidebar nftObj={nftObj} borderRadius="phat" />
      ) : (
        <FillV3AskModal nftObj={nftObj} {...props} />
      )
    }

    if (isOwner) return <UniversalListAskModal nftObj={nftObj} />

    return null
  }, [hasRelevantAsk, isOwner, isPrivateAsk, nftObj, props])

  return nftObj ? marketComponent : null
}
