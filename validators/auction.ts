import { Address, verifyType } from 'validators'

import {
  MarketStatus,
  NetworkInfo,
  NounsBuilderAuction,
  PriceAtTime,
  TransactionInfo,
} from '../types/zora.api.generated'

export type TypeSafeNounsAuction = {
  address: string
  auction: Address
  collectionAddress: string
  duration: string
  endTime: string
  governor: Address
  manager: Address
  metadata: Address
  minBidIncrementPercentage: number
  networkInfo: NetworkInfo
  startTime: string
  status: MarketStatus
  tokenId: string
  transactionInfo: TransactionInfo
  treasury: Address

  extended?: boolean
  estimatedDurationTime?: string //Maybe<Scalars['datetime']>
  firstBidTime?: string //Maybe<Scalars['datetime']>
  highestBidPrice?: PriceAtTime
  highestBidder?: Address
  reservePrice?: PriceAtTime
  winner?: Address
  amount?: PriceAtTime
  timeBuffer?: string
}

export function verifyAuction(a: NounsBuilderAuction) {
  const optionalFields = [
    'extended',
    'estimatedDurationTime',
    'firstBidTime',
    'highestBidPrice',
    'highestBidder',
    'reservePrice',
    'winner',
    'amount',
    'timeBuffer',
  ]
  return verifyType<NounsBuilderAuction, TypeSafeNounsAuction>(a, optionalFields)
}
