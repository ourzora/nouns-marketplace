import { useEffect } from 'react'
import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { useCountdown } from '@noun-auction/hooks/useCountdown'
import { SharedDataRendererProps } from '@noun-auction/typings'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'

// @shared
import { lightFont } from '@shared'

export function AuctionCountdown({
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  layoutDirection = 'row',
  ...props
}: {
  endedCopy?: string
} & SharedDataRendererProps) {
  const { setTimerComplete, layout, activeAuction } = useNounishAuctionProvider()

  const { text, isEnded } = useCountdown(
    activeAuction?.properties?.startTime,
    activeAuction?.properties?.endTime
  )

  useEffect(() => {
    if (isEnded) {
      setTimerComplete(true)
    } else {
      setTimerComplete(false)
    }
  }, [
    isEnded,
    activeAuction,
    activeAuction?.properties?.startTime,
    activeAuction?.properties?.endTime,
  ])

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
