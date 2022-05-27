import { ExchangeValue, ExchangeValueAmount } from './ExchangeValue'
import { Eyebrow, Heading, Stack } from '@zoralabs/zord/elements'
import React from 'react'

export interface PriceWithLabelAndConversionProps {
  label?: string
  amount?: string
  currencyAddress?: string
}

export function PriceWithLabelAndConversion({
  label,
  amount,
  currencyAddress,
}: PriceWithLabelAndConversionProps) {
  return (
    <Stack gap="x1">
      {label && <Eyebrow inline>{label}</Eyebrow>}
      {amount && (
        <>
          <ExchangeValue fallback="..." currencyAddress={currencyAddress} amount={amount}>
            {(rate) => (
              <>
                <Heading size="sm" inline>
                  {rate?.amount} {rate?.symbol}
                </Heading>

                <Eyebrow color="secondary" inline>
                  <ExchangeValueAmount amount={amount} rate={rate} />
                </Eyebrow>
              </>
            )}
          </ExchangeValue>
        </>
      )}
    </Stack>
  )
}
