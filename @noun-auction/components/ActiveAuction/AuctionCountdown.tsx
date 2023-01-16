import { useCountdown } from '@noun-auction/hooks'
import { Flex, FlexProps, Heading, Paragraph } from '@zord'

interface CountdownProps extends FlexProps {
  showLabels?: boolean
  endedCopy?: string
  label?: string
  layout?: string
  className?: string[]
  auctionCompleted: boolean
  auctionStartTime: string
  auctionEndTime: string
}

export function AuctionCountdown({
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  direction = 'row',
  layout,
  auctionCompleted,
  auctionStartTime,
  auctionEndTime,
  ...props
}: CountdownProps) {
  const { countdownText } = useCountdown(auctionStartTime, auctionEndTime)

  return (
    <Flex
      direction={direction}
      wrap="wrap"
      gap={direction === 'row' ? 'x2' : 'x2'}
      {...props}
    >
      {showLabels && (
        <Paragraph
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          align={{ '@initial': 'left', '@1024': 'right' }}
        >
          {auctionCompleted ? 'Status' : label}&nbsp;
        </Paragraph>
      )}
      <Heading size="xs" align={{ '@initial': 'left', '@1024': 'right' }}>
        {auctionCompleted ? endedCopy : countdownText}
      </Heading>
    </Flex>
  )
}

// AuctionCountdown.whyDidYouRender = true
