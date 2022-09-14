import { Eyebrow, Heading, Label, Stack } from '@zoralabs/zord'
import React from 'react'

export interface PriceWithLabelProps {
  cryptoAmount: string
  symbol: string
  label?: string
  usdAmount?: string
}

export function PriceWithLabel({
  cryptoAmount,
  usdAmount,
  symbol,
  label,
}: PriceWithLabelProps) {
  return (
    <Stack gap="x1">
      {label && <Eyebrow inline>{label}</Eyebrow>}

      <Heading as="h2" size="sm" inline>
        {cryptoAmount} {symbol}
      </Heading>
      {usdAmount && (
        <Eyebrow color="text2" inline>
          <Label size="xs">${usdAmount} USD</Label>
        </Eyebrow>
      )}
    </Stack>
  )
}
