import { Flex, Label } from '@zoralabs/zord'
import { useCountdown } from '@noun-auction/hooks/useCountdown'

export function AuctionCountdown({
  startTime,
  endTime,
  label = 'Ends in',
  endedCopy = 'Auction has ended',
  layoutDirection = 'row',
}: {
  startTime: string
  endTime: string
  label?: string
  endedCopy?: string
  layoutDirection?: 'column' | 'row'
}) {
  console.log(startTime, endTime)

  if (!startTime || !endTime) return null

  const { text, isEnded } = useCountdown(startTime, endTime)

  if (isEnded) return <Label>{endedCopy}</Label>

  return (
    <Flex direction={layoutDirection} gap="x1">
      <Label>{label}</Label>
      <Label>{text}</Label>
    </Flex>
  )
}
