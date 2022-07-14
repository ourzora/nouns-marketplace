import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'

// @shared
import { lightFont } from 'styles/styles.css'

export function AuctionHighBid({
  label = 'Current bid',
  layoutDirection = 'row',
  ethSymbol = 'Ξ',
  ethValue,
  showLabels,
  usdcValue,
  useUsdc = false,
  ...props
}: {
  ethSymbol?: string
  ethValue: string
  usdcValue: string
  useUsdc?: boolean
} & SharedDataRendererProps) {
  return (
    <Flex
      direction={layoutDirection}
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      {...props}
    >
      {showLabels && (
        <Label
          size="lg"
          className={lightFont}
          color="secondary"
          style={{ lineHeight: '1.15' }}
          textAlign="right"
        >
          {label}
        </Label>
      )}
      <Label
        style={{ lineHeight: '1.15' }}
        size="lg"
        textAlign="right"
      >{`${ethValue} ${ethSymbol}`}</Label>
    </Flex>
  )
}
