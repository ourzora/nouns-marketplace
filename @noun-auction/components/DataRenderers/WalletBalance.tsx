import { useBalance } from 'wagmi'

import { useMemo } from 'react'

import { SharedDataRendererProps, useNounishAuctionProvider } from '@noun-auction'
import { lightFont, roundFourDecimals } from '@shared'
import { Flex, Label } from '@zoralabs/zord'

export function WalletBalance({
  label = 'Your balance',
  layoutDirection = 'row',
  address,
  showLabels,
  ...props
}: {
  address: string
} & SharedDataRendererProps) {
  const { layout } = useNounishAuctionProvider()

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
          className={lightFont}
          style={{ lineHeight: '1.15' }}
          align={layout === 'sideBarBid' ? 'left' : 'right'}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          mb={layout === 'sideBarBid' ? 'x2' : 'x0'}
        >
          {label}
        </Label>
      )}
      <Label>{balance}</Label>
    </Flex>
  )
}
