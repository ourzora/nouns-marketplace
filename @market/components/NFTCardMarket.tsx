import { useToken } from 'hooks/useToken'

import { NFTOwner } from '@market/components'
import { useRelevantMarket } from '@market/hooks'
import { V3AskModal } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { FlexProps } from '@zoralabs/zord'

export interface NFTCardMarketProps extends FlexProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  isOwner?: boolean
  ownerAddress?: string
}

export function NFTCardMarket({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  isOwner,
  ownerAddress,
  ...props
}: NFTCardMarketProps) {
  const { hasRelevantAsk } = useRelevantMarket(markets)

  if (isOwner) {
    return (
      <UniversalListAskFlow
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
        {...props}
      />
    )
  }

  if (hasRelevantAsk) {
    return (
      <V3AskModal
        isOwner={false}
        modalName="V3AskV3"
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
      />
    )
  }

  return <NFTOwner size="md" align="left" address={ownerAddress} />
}
