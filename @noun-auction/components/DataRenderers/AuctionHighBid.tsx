import { useMemo } from 'react'
import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'
import { EthAmount } from './EthAmount'

// @shared
import { lightFont } from 'styles/styles.css'

export function AuctionHighBid({
  label = 'Current bid',
  layoutDirection = 'row',
  ethValue,
  showLabels,
  usdcValue,
  useUsdc = false,
  ...props
}: {
  ethValue: string
  usdcValue: string
  useUsdc?: boolean
} & SharedDataRendererProps) {
  console.log(ethValue)

  return (
    <Flex
      direction={layoutDirection}
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      {...props}
    >
      {showLabels && (
        <Label
          size="md"
          className={lightFont}
          color="secondary"
          style={{ lineHeight: '1.15' }}
          align="right"
        >
          {label}
        </Label>
      )}
      <EthAmount
        style={{ lineHeight: '1.15' }}
        size="md"
        align="right"
        ethAmount={ethValue}
      />
    </Flex>
  )
}
