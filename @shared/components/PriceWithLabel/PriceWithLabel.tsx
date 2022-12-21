import { mediumFont } from 'styles/styles.css'

import React from 'react'

import { Eyebrow, Heading, Stack } from '@zord'

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
  return (
    <Stack>
      {label && (
        <Eyebrow inline className={mediumFont} color={invertColor ? 'text2' : 'text3'}>
          {label}
        </Eyebrow>
      )}
      <Heading as="h2" size="sm" inline color={invertColor ? 'onAccent' : 'text1'}>
        {cryptoAmount} {symbol}
      </Heading>
      {usdAmount && (
        <Eyebrow color="text2" inline className={mediumFont}>
          {usdAmount} USD
        </Eyebrow>
      )}
    </Stack>
  )
}
