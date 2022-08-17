import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'
import { EthAmount } from './EthAmount'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { sidebarHighBid } from '@noun-auction/styles/NounishStyles.css'

// @shared
import { lightFont } from '@shared'

export function AuctionHighBid({
  label = 'Current bid',
  layoutDirection = 'row',
  showLabels,
  ...props
}: {
  useUsdc?: boolean
} & SharedDataRendererProps) {
  const { layout, timerComplete, activeAuction } = useNounishAuctionProvider()

  const highestBid = activeAuction?.properties?.highestBidPrice?.chainTokenPrice?.raw

  return (
    <Flex
      direction={layoutDirection}
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      {...props}
    >
      {showLabels && (
        <Label
          size={layout === 'sideBarBid' ? 'lg' : 'md'}
          className={lightFont}
          style={{ lineHeight: '1.15' }}
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          mb={layout === 'sideBarBid' ? 'x2' : 'x0'}
        >
          {timerComplete ? 'Winning bid' : label}
        </Label>
      )}
      {highestBid && (
        <EthAmount
          style={{ lineHeight: '1.15' }}
          size="md"
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          className={layout === 'sideBarBid' && sidebarHighBid}
          ethAmount={highestBid}
        />
      )}
    </Flex>
  )
}
