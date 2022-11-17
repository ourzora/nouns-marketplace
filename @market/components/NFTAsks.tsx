import { NFTOffchainOrders } from 'compositions'

import { useMemo } from 'react'

import { FillV3AskModal } from '@market/components/FillV3AskModal'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  nftObj: NFTObject
  offchainOrders?: any
}

export function NFTAsks({ nftObj, offchainOrders, ...props }: NFTAskProps) {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { isOwner } = useIsOwner(nftObj)
  const { hasRelevantAsk, isPrivateAsk } = useAskHelper({ ask })

  const showOffchainOrders = useMemo(
    () => offchainOrders?.length > 0 && !isOwner,
    [isOwner, offchainOrders?.length]
  )

  const marketComponent = useMemo(() => {
    if (hasRelevantAsk) {
      return isPrivateAsk ? (
        <PrivateAskSidebar nftObj={nftObj} borderRadius="phat" />
      ) : (
        <FillV3AskModal nftObj={nftObj} {...props} />
      )
    }

    if (showOffchainOrders) {
      return <NFTOffchainOrders nft={nftObj} offchainOrders={offchainOrders} />
    }

    if (isOwner) return <UniversalListAskModal nftObj={nftObj} />

    return null
  }, [
    hasRelevantAsk,
    isOwner,
    isPrivateAsk,
    nftObj,
    offchainOrders,
    props,
    showOffchainOrders,
  ])

  return nftObj ? marketComponent : null
}
