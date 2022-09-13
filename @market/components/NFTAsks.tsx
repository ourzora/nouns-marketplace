import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { FillV3AskModal, NFTOwner } from '@market/components'
import { FlexProps } from '@zoralabs/zord'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { useIsOwner } from '@shared/hooks/useIsOwner'

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
      // MANAGE ASKS
      return isPrivateAsk ? (
        <PrivateAskSidebar nftObj={nftObj} />
      ) : (
        <FillV3AskModal nftObj={nftObj} {...props} />
      )
    }

    if (isOwner) {
      return (
        <>
          {/* <UniversalListAskModal nftObj={nftObj} /> */}
          {/* <PrivateAskSidebar nft={nftObj} /> */}
          {/* <ListV3AskModal nftObj={nftObj} {...props} /> */}
        </>
      )
    }

    return <NFTOwner address={nftObj.nft?.owner?.address} align="left" />
  }, [hasRelevantAsk, isOwner, isPrivateAsk, nftObj, props])

  return nftObj ? marketComponent : null
}
