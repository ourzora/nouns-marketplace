import { sidebarHighBid } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, FlexProps, Label } from '@zoralabs/zord'

import { EthAmount } from './EthAmount'

interface HighBidProps extends FlexProps {
  showLabels?: boolean
  layout: string
  highestBid?: string
  collectionAddress: string
  auctionCompleted: boolean
  label?: string
}

export function AuctionHighBid({
  showLabels,
  highestBid,
  layout,
  direction = 'row',
  label = 'Current bid',
  auctionCompleted,
  className,
  ...props
}: HighBidProps) {
  return (
    <Flex direction={direction} gap="x2" className={className} {...props}>
      {showLabels && (
        <Label
          size={layout === 'sideBarBid' ? 'lg' : 'md'}
          className={lightFont}
          style={{ lineHeight: '1.15' }}
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
        >
          {auctionCompleted ? 'Winning bid' : label}
        </Label>
      )}
      {highestBid && (
        <EthAmount
          style={{ lineHeight: '1.15' }}
          size="md"
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          className={layout === 'sideBarBid' && sidebarHighBid}
          ethAmount={highestBid}
        />
      )}
    </Flex>
  )
}
