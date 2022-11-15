import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { FillV3AskModal } from '@market/components/FillV3AskModal'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  nftObj: NFTObject
}

export function NFTAsks({ nftObj, ...props }: NFTAskProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { isOwner } = useIsOwner(nftObj)
  const { hasRelevantAsk, isPrivateAsk } = useAskHelper({ ask })

  const marketComponent = useMemo(() => {
    if (hasRelevantAsk) {
      return isPrivateAsk ? (
        <PrivateAskSidebar nftObj={nftObj} borderRadius="phat" />
      ) : (
        <FillV3AskModal nftObj={nftObj} {...props} />
      )
    }

    if (isOwner) return <UniversalListAskModal nftObj={nftObj} />

    return null
  }, [hasRelevantAsk, isOwner, isPrivateAsk, nftObj, props])

  return nftObj ? marketComponent : null
}
