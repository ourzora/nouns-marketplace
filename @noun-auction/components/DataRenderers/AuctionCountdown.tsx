import { Flex, Label } from '@zoralabs/zord'
import { useCountdown } from '@noun-auction/hooks/useCountdown'
import { SharedDataRendererProps } from '@noun-auction/typings'
import { lightFont } from 'styles/styles.css'

export function AuctionCountdown({
  startTime,
  endTime,
  endedCopy = 'Auction has ended',
  label = 'Ends in',
  layoutDirection = 'row',
}: {
  startTime: string
  endTime: string
  endedCopy?: string
} & SharedDataRendererProps) {
  if (!startTime || !endTime) return null

  const { text, isEnded } = useCountdown(startTime, endTime)

  if (isEnded) return <Label>{endedCopy}</Label>

  return (
    <Flex direction={layoutDirection} wrap="wrap">
      <Label
        size="lg"
        className={lightFont}
        color="secondary"
        style={{ lineHeight: '1.15' }}
      >
        {label}&nbsp;
      </Label>
      <Label size="lg" style={{ lineHeight: '1.15' }}>
        {text}
      </Label>
    </Flex>
  )
}
