import { Flex, Label } from '@zoralabs/zord'
import { SharedDataRendererProps } from '@noun-auction/typings'
import { lightFont } from 'styles/styles.css'

export function AuctionHighBid({
  label = 'Current bid',
  layoutDirection = 'row',
  ethSymbol = 'Ξ',
  ethValue,
  usdcValue,
  useUsdc = false,
}: {
  ethSymbol?: string
  ethValue: string
  usdcValue: string
  useUsdc?: boolean
} & SharedDataRendererProps) {
  return (
    <Flex direction={layoutDirection} gap={layoutDirection === 'row' ? 'x2' : 'x0'}>
      <Label
        size="lg"
        className={lightFont}
        color="secondary"
        style={{ lineHeight: '1.15' }}
      >
        {label}
      </Label>
      <Label style={{ lineHeight: '1.15' }} size="lg">{`${ethValue} ${ethSymbol}`}</Label>
    </Flex>
  )
}
