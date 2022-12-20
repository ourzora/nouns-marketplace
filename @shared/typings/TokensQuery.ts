import { NFTObject } from '@zoralabs/nft-hooks'

export type GetNFTReturnType = {
  tokens: NFTObject[]
  nextCursor?: string | null
}
