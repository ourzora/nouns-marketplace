import React from 'react'

import { Heading, Paragraph, Stack } from '@zord'

export interface PriceWithLabelProps {
  cryptoAmount: string
  symbol: string
  label?: string
  usdAmount?: string
  invertColor?: boolean
}

export function PriceWithLabel({
  cryptoAmount,
  usdAmount,
  symbol,
  label,
  invertColor,
}: PriceWithLabelProps) {
  const invertedPColor = invertColor ? 'text3' : 'text2'
  return (
    <Stack>
      {label && (
        <Paragraph inline color={invertedPColor}>
          {label}
        </Paragraph>
      )}
      <Heading as="h2" size="sm" inline color={invertColor ? 'onAccent' : 'text1'}>
        {cryptoAmount} {symbol}
      </Heading>
      {usdAmount && (
        <Paragraph color={invertedPColor} inline>
          {usdAmount} USD
        </Paragraph>
      )}
    </Stack>
  )
}
