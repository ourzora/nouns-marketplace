import { verifyType } from 'validators'

import { NetworkInfo, NounsDao } from '../types/zora.api.generated'

export type TypeSafeDao = {
  auctionAddress: string
  collectionAddress: string
  contractAddress: string
  governorAddress: string
  metadataAddress: string
  networkInfo: NetworkInfo
  treasuryAddress: string
  totalSupply?: number
  description?: string
  symbol?: string
  name?: string
}

export function verifyDao(a: NounsDao) {
  const optionalFields = ['totalSupply', 'description', 'symbol', 'name']

  return verifyType<NounsDao, TypeSafeDao>(a, optionalFields)
}
