import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { useCountdown } from '@noun-auction/hooks/useCountdown'
import { SharedDataRendererProps } from '@noun-auction/typings'

// @shared
import { lightFont } from 'styles/styles.css'

export function AuctionCountdown({
  startTime,
  endTime,
  showLabels,
  endedCopy = 'Auction has ended',
  label = 'Ends in',
  layoutDirection = 'row',
  ...props
}: {
  startTime: string
  endTime: string
  endedCopy?: string
} & SharedDataRendererProps) {
  if (!startTime || !endTime) return null

  const { text, isEnded } = useCountdown(startTime, endTime)

  return (
    <Flex direction={layoutDirection} wrap="wrap" {...props}>
      {showLabels && (
        <Label
          size="lg"
          className={lightFont}
          color="secondary"
          style={{ lineHeight: '1.15' }}
          align="right"
        >
          {label}&nbsp;
        </Label>
      )}
      {!isEnded ? (
        <Label size="lg" style={{ lineHeight: '1.15' }} align="right">
          {text}
        </Label>
      ) : (
        <Label size="lg" style={{ lineHeight: '1.15' }} align="right">
          {endedCopy}
        </Label>
      )}
    </Flex>
  )
}
