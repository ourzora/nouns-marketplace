import { useEffect } from 'react'

import { useCountdown } from '@noun-auction/hooks/useCountdown'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, Label } from '@zoralabs/zord'

export function AuctionCountdown({
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  layoutDirection = 'row',
  activeAuction,
  setTimerComplete = () => {},
  layout,
  ...props
}: any) {
  const { startTime, endTime } = activeAuction
  const { text, isEnded } = useCountdown(startTime, endTime)

  useEffect(() => {
    if (isEnded) {
      setTimerComplete(true)
    } else {
      setTimerComplete(false)
    }
  }, [isEnded, startTime, endTime, setTimerComplete])

  return (
    <Flex
      direction={layoutDirection}
      wrap="wrap"
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      {...props}
    >
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
          align={{ '@initial': 'left', '@1024': 'right' }}
        >
          {!isEnded ? label : 'Status'}&nbsp;
        </Label>
      )}
      {!isEnded ? (
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align={{ '@initial': 'left', '@1024': 'right' }}
          className={[layout === 'sideBarBid' && sideBarUpperLabel]}
        >
          {text}
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
