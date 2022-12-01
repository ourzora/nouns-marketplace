import { NFTObject } from '@zoralabs/nft-hooks'
import { OffchainOrderWithToken } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { StackProps } from '@zord'

export interface CommonPrivateAskComponentProps extends StackProps {
  nft: NFTObject
  onNext?: () => void
}

export interface CommonSeaportFillOrderProps extends StackProps {
  order: OffchainOrderWithToken
  nft: NFTObject
  userAddress?: string
}
