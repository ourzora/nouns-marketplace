import { fromUnixTime, intervalToDuration } from 'date-fns'

import { useMemo, useState } from 'react'

import { useInterval } from '@noun-auction/hooks/useInterval'
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
  auctionEndTime: string
}

export function AuctionCountdown({
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  direction = 'row',
  layout,
  auctionCompleted,
  auctionEndTime,
}: CountdownProps) {
  const [now, setNow] = useState(new Date())

  const countdownText = useMemo(() => {
    if (auctionCompleted || !auctionEndTime) return ''

    const { hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: fromUnixTime(parseInt(auctionEndTime)),
    })

    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [auctionCompleted, auctionEndTime, now])

  useInterval(() => setNow(new Date()), 1000)

  return (
    <Flex direction={direction} wrap="wrap" gap={direction === 'row' ? 'x2' : 'x0'}>
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
