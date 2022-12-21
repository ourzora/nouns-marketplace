import { useBalance } from 'wagmi'

import { useMemo } from 'react'

import { auctionWrapperVariants } from '@noun-auction'
import { SharedDataRendererProps } from '@noun-auction'
import { roundFourDecimals } from '@shared'
import { Flex, Label } from '@zord'

export function WalletBalance({
  label = 'Your balance',
  layoutDirection = 'row',
  address,
  showLabels,
  layout,
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
      {...props}
    >
      {showLabels && (
        <Label
          size={layout === 'sideBarBid' ? 'lg' : 'md'}
          style={{ lineHeight: '1.15' }}
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
        >
          {label}
        </Label>
      )}
      <Label>{balance}</Label>
    </Flex>
  )
}
