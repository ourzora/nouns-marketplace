import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { FillV3AskModal } from '@market/components'
import { FlexProps } from '@zoralabs/zord'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'

export interface NFTAskProps extends FlexProps {
  nftData: NFTObject
}

export function NFTAsks({ nftData, ...props }: NFTAskProps) {
  const { markets } = nftData
  const { ask } = useRelevantMarket(markets)
  const { hasRelevantAsk, isPrivateAsk } = useAskHelper({ ask })

  const marketComponent = useMemo(() => {
    if (hasRelevantAsk) {
      // MANAGE ASKS
      return isPrivateAsk ? (
        <PrivateAskSidebar nft={nftData} />
      ) : (
        <FillV3AskModal nftData={nftData} {...props} />
      )
    } else {
      return (
        <>
          <UniversalListAskModal nftData={nftData} />
          {/* <PrivateAskSidebar nft={nftData} /> */}
          {/* <ListV3AskModal nftData={nftData} {...props} /> */}
        </>
      )
    }
  }, [hasRelevantAsk, isPrivateAsk, nftData, props])

  return nftData ? marketComponent : null
}
