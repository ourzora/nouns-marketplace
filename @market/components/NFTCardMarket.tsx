import { FillV3AskModal } from '@market/components'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { UniversalListAskFlow } from '@market/modules/V3Ask/UniversalListAskFlow'
import { useNFTProvider } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zoralabs/zord'

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
  const { ask } = useRelevantMarket(markets)
  const { hasRelevantAsk } = useAskHelper({ ask })

  return hasRelevantAsk ? (
    <FillV3AskModal nftObj={nftObj} {...props} />
  ) : (
    <UniversalListAskFlow nftObj={nftObj} {...props} />
  )
}
