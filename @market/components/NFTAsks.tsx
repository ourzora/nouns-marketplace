import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { ListV3AskModal, FillV3AskModal } from '@market/components'
import { FlexProps } from '@zoralabs/zord'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'

export interface NFTAskProps extends FlexProps {
  nftData: NFTObject
}

export function NFTAsks({ nftData, ...props }: NFTAskProps) {
  const { markets } = nftData
  const { ask } = useRelevantMarket(markets)
  const { hasAsk, isCompletedAsk, isActiveAsk, isPrivateAsk } = useAskHelper({ ask })
  const hasRelevantAsk = useMemo(
    () => hasAsk && (isCompletedAsk || isActiveAsk),
    [hasAsk, isActiveAsk, isCompletedAsk]
  )

  const marketComponent = useMemo(() => {
    if (hasRelevantAsk) {
      return isPrivateAsk ? (
        <PrivateAskSidebar nft={nftData} />
      ) : (
        <FillV3AskModal nftData={nftData} {...props} />
      )
    } else {
      return (
        <>
          <PrivateAskSidebar nft={nftData} />
          <ListV3AskModal nftData={nftData} {...props} />
        </>
      )
    }
  }, [hasRelevantAsk, isPrivateAsk, nftData, props])

  return nftData ? marketComponent : null
}
