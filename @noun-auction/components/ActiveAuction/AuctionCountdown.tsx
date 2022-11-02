import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, Label } from '@zoralabs/zord'

type Props = {
  showLabels?: boolean
  endedCopy?: string
  label?: string
  layoutDirection?: 'row' | 'column'
  layout?: string
  startTime: string
  endTime: string
  className?: string[]
  auctionCompleted: boolean
  countdownText: string
  styles: { [k in string]: any }
}

export function AuctionCountdown({
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  layoutDirection = 'row',
  layout,
  styles,
  auctionCompleted,
  countdownText,
}: Props) {
  // console.log('AuctionCountdown', { auctionCompleted, countdownText })

  return (
    <Flex
      direction={layoutDirection}
      wrap="wrap"
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      {...styles}
    >
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
          align={{ '@initial': 'left', '@1024': 'right' }}
        >
          {!auctionCompleted ? label : 'Status'}&nbsp;
        </Label>
      )}
      {!auctionCompleted ? (
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align={{ '@initial': 'left', '@1024': 'right' }}
          className={[layout === 'sideBarBid' && sideBarUpperLabel]}
        >
          {countdownText}
        </Label>
      ) : (
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align={{ '@initial': 'left', '@1024': 'right' }}
          className={[layout === 'sideBarBid' && sideBarUpperLabel]}
        >
          {endedCopy}
        </Label>
      )}
    </Flex>
  )
}

AuctionCountdown.whyDidYouRender = true
