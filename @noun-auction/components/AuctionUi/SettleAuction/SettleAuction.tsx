import { buttonVariants } from 'components/Button/Button.css'

import { SettleAuctionProps } from '@noun-auction/components/common'

import { isOGNounAddress } from '../NounsBidForm'
import { SettleAuctionBuilder } from './SettleAuctionBuilder'
import { SettlementType } from './SettleAuctionComponent'
import { SettleAuctionOGNouns } from './SettleAuctionOGNouns'

export interface SettleAuctionProps extends StackProps {
  useErrorMsg?: boolean
  auctionContractAddress: string
  settlementType?: SettlementType
  layout: keyof typeof auctionWrapperVariants['layout']
  buttonVariant?: keyof typeof buttonVariants['variant']
}

export function SettleAuction({ auctionContractAddress, ...rest }: SettleAuctionProps) {
  return isOGNounAddress(auctionContractAddress) ? (
    <SettleAuctionOGNouns auctionContractAddress={auctionContractAddress} {...rest} />
  ) : (
    <SettleAuctionBuilder auctionContractAddress={auctionContractAddress} {...rest} />
  )
}
