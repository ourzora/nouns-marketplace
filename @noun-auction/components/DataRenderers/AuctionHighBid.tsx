import { Flex, FlexProps, Paragraph } from '@zord'

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
        <Paragraph
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
        >
          {auctionCompleted ? 'Winning bid' : label}
        </Paragraph>
      )}
      {highestBid && (
        <EthAmount
          size="md"
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          ethAmount={highestBid}
        />
      )}
    </Flex>
  )
}
