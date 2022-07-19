import { useEffect } from 'react'
import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { useCountdown } from '@noun-auction/hooks/useCountdown'
import { SharedDataRendererProps } from '@noun-auction/typings'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'

// @shared
import { lightFont } from 'styles/styles.css'

export function AuctionCountdown({
  startTime,
  endTime,
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  layoutDirection = 'row',
  ...props
}: {
  startTime: string
  endTime: string
  endedCopy?: string
} & SharedDataRendererProps) {
  const { setTimerComplete, layout } = useNounishAuctionProvider()

  if (!startTime || !endTime) return null

  const { text, isEnded } = useCountdown(startTime, endTime)

  useEffect(() => {
    if (isEnded) {
      setTimerComplete(true)
    }
  }, [isEnded, text])

  return (
    <Flex direction={layoutDirection} wrap="wrap" {...props}>
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
          align="right"
        >
          {!isEnded ? label : 'Status'}&nbsp;
        </Label>
      )}
      {!isEnded ? (
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align="right"
          className={[layout === 'sideBarBid' && sideBarUpperLabel]}
        >
          {text}
        </Label>
      ) : (
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align="right"
          className={[layout === 'sideBarBid' && sideBarUpperLabel]}
        >
          {endedCopy}
        </Label>
      )}
    </Flex>
  )
}
