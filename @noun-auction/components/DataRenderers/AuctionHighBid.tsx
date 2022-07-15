import { useMemo } from 'react'
import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'

// @shared
import { lightFont } from 'styles/styles.css'
import { roundTwoDecimals } from 'utils/math'

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
  const roundedEthValue = useMemo(() => {
    return ethValue ? roundTwoDecimals(parseFloat(ethValue)) : 'N/A'
  }, [ethValue])

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
          align="right"
        >
          {label}
        </Label>
      )}
      <Label
        style={{ lineHeight: '1.15' }}
        size="lg"
        align="right"
      >{`${roundedEthValue} ${ethSymbol}`}</Label>
    </Flex>
  )
}
