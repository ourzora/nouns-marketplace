import { mediumFont } from 'styles/styles.css'

import React from 'react'

import { Eyebrow, Heading, Label, Stack } from '@zoralabs/zord'

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
      {label && (
        <Eyebrow inline className={mediumFont}>
          {label}
        </Eyebrow>
      )}

      <Heading as="h2" size="sm" inline>
        {cryptoAmount} {symbol}
      </Heading>
      {usdAmount && (
        <Eyebrow color="text2" inline>
          <Label size="xs" className={mediumFont}>
            ${usdAmount} USD
          </Label>
        </Eyebrow>
      )}
    </Stack>
  )
}
