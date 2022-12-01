import { FillV3AskModal, NFTOwner } from '@market/components'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
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

  if (hasRelevantAsk) {
    return <FillV3AskModal nftObj={nftObj} {...props} />
  }

  if (isOwner) {
    return <UniversalListAskModal nftObj={nftObj} {...props} />
  }

  return <NFTOwner size="md" align="left" address={nftObj.nft?.owner?.address} />
}
