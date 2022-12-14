import { NFTOffchainOrders } from 'compositions'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'

import { useRelevantMarket } from '@market/hooks'
import { V3AskSidebar } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  offchainOrders?: OffchainOrderWithToken[]
  isOwner: boolean
}

// ask?.amount?.eth?.value
// inalizedV3AskDetails?.rawBuyerAddress ?? ask?.raw.properties.buyer
// finalizedV3AskDetails?.price

export function NFTAsks({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  offchainOrders,
  isOwner,
}: NFTAskProps) {
  const { hasRelevantAsk } = useRelevantMarket(markets)

  const showOffchainOrders = useMemo(
    () => offchainOrders && offchainOrders?.length > 0 && !isOwner,
    [isOwner, offchainOrders]
  )

  if (hasRelevantAsk) {
    return (
      <V3AskSidebar
        isOwner={isOwner}
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
        borderRadius="phat"
      />
    )
  }

  if (showOffchainOrders) {
    return (
      <NFTOffchainOrders
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
        offchainOrders={offchainOrders!}
      />
    )
  }

  if (isOwner)
    return (
      <UniversalListAskFlow
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
      />
    )

  return null
}
