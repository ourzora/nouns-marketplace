import { Address, verifyType } from 'validators'

import {
  MintInfo,
  NetworkInfo,
  Scalars,
  Token,
  TokenAttribute,
  TokenContentMedia,
} from '../types/zora.api.generated'

export type TypeSafeToken = {
  tokenContract: Address
  tokenId: string
  collectionAddress: string
  collectionName: string
  name: string
  networkInfo: NetworkInfo
  description: string
  image: TokenContentMedia
  attributes?: TokenAttribute[]
  content?: TokenContentMedia
  lastRefreshTime?: Scalars['datetime']
  metadata?: Scalars['JSONScalar']
  mintInfo?: MintInfo
  owner?: Address
  tokenUrl?: string
  tokenUrlMimeType?: string
}

export function verifyToken(a: Token) {
  const optionalFields = [
    'attributes',
    'content',
    'lastRefreshTime',
    'metadata',
    'mintInfo',
    'owner',
    'tokenUrl',
    'tokenUrlMimeType',
  ]

  return verifyType<Token, TypeSafeToken>(a, optionalFields)
}
