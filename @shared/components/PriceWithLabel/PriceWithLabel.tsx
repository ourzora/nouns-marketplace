import { Eyebrow, Heading, Label, Stack } from '@zoralabs/zord'
import React from 'react'
// import { CurrencyValue } from '@zoralabs/nft-hooks/dist/types'

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

      <Heading size="sm" inline>
        {cryptoAmount} {symbol}
      </Heading>
      {usdAmount && (
        <Eyebrow color="secondary" inline>
          <Label size="xs">${usdAmount} USD</Label>
        </Eyebrow>
      )}
    </Stack>
  )
}
