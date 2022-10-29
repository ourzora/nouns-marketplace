import { V3AskSidebar } from '@market/modules/V3Ask'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  nftObj: NFTObject
}

export function NFTAsks({ nftObj, ...props }: NFTAskProps) {
  if (!nftObj) return null
  return <V3AskSidebar nftObj={nftObj} borderRadius="phat" />
}
