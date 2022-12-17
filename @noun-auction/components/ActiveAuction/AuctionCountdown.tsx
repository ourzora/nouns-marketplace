import { useCountdown } from '@noun-auction/hooks'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, FlexProps, Label } from '@zoralabs/zord'

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
}: CountdownProps) {
  const { countdownText } = useCountdown(auctionStartTime, auctionEndTime)

  return (
    <Flex direction={direction} wrap="wrap" gap={direction === 'row' ? 'x2' : 'x2'}>
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
          align={{ '@initial': 'left', '@1024': 'right' }}
        >
          {auctionCompleted ? 'Status' : label}&nbsp;
        </Label>
      )}
      <Label
        size="md"
        style={{ lineHeight: '1.15' }}
        align={{ '@initial': 'left', '@1024': 'right' }}
        className={[layout === 'sideBarBid' && sideBarUpperLabel]}
      >
        {auctionCompleted ? endedCopy : countdownText}
      </Label>
    </Flex>
  )
}

// AuctionCountdown.whyDidYouRender = true
