import { useMemo } from 'react'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { BoxProps, Button, Stack, buttonVariants } from '@zord'

export type SettlementType = 'settle' | 'claim'

type SettleAuctionComponentProps = {
  layout: keyof typeof styles.auctionWrapperVariants['layout']
  handleOnSubmit: any // FIXME
  isLoading: boolean
  txSubmitted: boolean
  settlementType?: SettlementType
  buttonVariant?: keyof typeof buttonVariants
} & BoxProps

const buttonText = {
  settle: {
    cta: 'Settle Auction',
    afterSubmit: 'Settling...',
  },
  claim: {
    cta: 'Claim NFT',
    afterSubmit: 'Claiming...',
  },
}

export const SettleAuctionComponent = ({
  layout,
  handleOnSubmit,
  isLoading,
  txSubmitted,
  buttonVariant = 'secondary',
  settlementType = 'settle',
  ...props
}: SettleAuctionComponentProps) => {
  const relevantButtonText = useMemo(
    () => (settlementType === 'settle' ? buttonText.settle : buttonText.claim),
    [settlementType]
  )
  return (
    <Stack w={layout === 'sideBarBid' ? '100%' : 'auto'} {...props}>
      <Button
        onClick={handleOnSubmit}
        variant={buttonVariant}
        className={styles.placeBidTrigger}
        w={layout === 'sideBarBid' ? '100%' : 'auto'}
        loading={isLoading}
      >
        {txSubmitted ? relevantButtonText.afterSubmit : relevantButtonText.cta}
      </Button>
    </Stack>
  )
}
