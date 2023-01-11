import { useBalance } from 'wagmi'

import { useMemo } from 'react'

import { auctionWrapperVariants } from '@noun-auction'
import { SharedDataRendererProps } from '@noun-auction'
import { roundFourDecimals } from '@shared'
import { Flex, Heading, Label, Paragraph, Span } from '@zord'

export function WalletBalance({
  label = 'Your balance',
  layoutDirection = 'row',
  address,
  showLabels,
  layout,
  className,
  ...props
}: {
  address: string
  layout: keyof typeof auctionWrapperVariants['layout']
} & SharedDataRendererProps) {
  const { data } = useBalance({
    addressOrName: address,
  })

  const balance = useMemo(() => {
    if (data) return roundFourDecimals(parseFloat(data?.formatted))
  }, [data])

  return (
    <Flex
      direction={layoutDirection}
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      className={className}
      {...props}
    >
      {showLabels && (
        <Paragraph
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
        >
          {label}
        </Paragraph>
      )}
      <Heading size="xs">
        {balance} {data?.symbol}
      </Heading>
    </Flex>
  )
}
