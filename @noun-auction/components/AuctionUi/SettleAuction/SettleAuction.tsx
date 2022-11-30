import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import { StackProps } from '@zoralabs/zord'

import { isOGNounAddress } from '../NounsBidForm'
import { SettleAuctionBuilder } from './SettleAuctionBuilder'
import { SettleAuctionOGNouns } from './SettleAuctionOGNouns'

export interface SettleAuctionProps extends StackProps {
  useErrorMsg?: boolean
  auctionContractAddress: string
  layout: keyof typeof auctionWrapperVariants['layout']
}

export function SettleAuction({ auctionContractAddress, ...rest }: SettleAuctionProps) {
  if (isOGNounAddress(auctionContractAddress)) {
    return (
      <SettleAuctionOGNouns auctionContractAddress={auctionContractAddress} {...rest} />
    )
  } else {
    return (
      <SettleAuctionBuilder auctionContractAddress={auctionContractAddress} {...rest} />
    )
  }
}
