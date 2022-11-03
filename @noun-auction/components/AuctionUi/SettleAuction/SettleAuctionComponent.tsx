import { Button } from 'components/Button'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { BoxProps, Stack } from '@zoralabs/zord'

type SettleAuctionComponentProps = {
  layout: keyof typeof styles.auctionWrapperVariants['layout']
  handleOnSubmit: any // FIXME
  isLoading: boolean
  txSubmitted: boolean
} & BoxProps

export const SettleAuctionComponent = ({
  layout,
  handleOnSubmit,
  isLoading,
  txSubmitted,
  ...props
}: SettleAuctionComponentProps) => {
  return (
    <Stack w={layout === 'sideBarBid' ? '100%' : 'auto'} {...props}>
      <Button
        onClick={handleOnSubmit}
        variant="secondary"
        className={styles.placeBidTrigger}
        w={layout === 'sideBarBid' ? '100%' : 'auto'}
        loading={isLoading}
      >
        {txSubmitted ? 'Settling...' : 'Settle Auction'}
      </Button>
    </Stack>
  )
}
