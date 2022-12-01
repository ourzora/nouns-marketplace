import { SettleAuctionProps } from '@noun-auction/components/common'

import { isOGNounAddress } from '../NounsBidForm'
import { SettleAuctionBuiler } from './SettleAuctionBuilder'
import { SettleAuctionOGNouns } from './SettleAuctionOGNouns'

export function SettleAuction({ auctionContractAddress, ...rest }: SettleAuctionProps) {
  if (isOGNounAddress(auctionContractAddress)) {
    return (
      <SettleAuctionOGNouns auctionContractAddress={auctionContractAddress} {...rest} />
    )
  } else {
    return (
      <SettleAuctionBuiler auctionContractAddress={auctionContractAddress} {...rest} />
    )
  }
}
