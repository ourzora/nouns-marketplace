import { NFTCardMarketOwner } from '@market/components'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { V3AskModal } from '@market/modules/V3Ask'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { useIsOwner, useNFTProvider } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zord'

export interface NFTCardMarketProps extends FlexProps {}

export function NFTCardMarket(props: NFTCardMarketProps) {
  const { nft: nftObj } = useNFTProvider()

  if (!nftObj) return null

  return <NFTCardMarketComponent nftObj={nftObj} {...props} />
}

export function NFTCardMarketComponent({
  nftObj,
  ...props
}: { nftObj: NFTObject } & NFTCardMarketProps) {
  const { markets } = nftObj
  const { isOwner } = useIsOwner(nftObj)
  const { ask } = useRelevantMarket(markets)
  const { hasRelevantAsk } = useAskHelper({ ask })

  if (isOwner) {
    return <UniversalListAskFlow nftObj={nftObj} {...props} />
  }

  if (hasRelevantAsk) {
    return <V3AskModal modalName="V3AskV3" nftObj={nftObj} />
  }

  return <NFTCardMarketOwner size="md" address={nftObj.nft?.owner?.address} />
}
