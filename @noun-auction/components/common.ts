import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import { StackProps } from '@zord'

export interface SettleAuctionProps extends StackProps {
  useErrorMsg?: boolean
  auctionContractAddress: string
  layout: keyof typeof auctionWrapperVariants['layout']
}
