import { BigNumberish } from '@ethersproject/bignumber'
import { Label, LabelProps } from '@zoralabs/zord/elements'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { ExchangeRate } from 'services/exchange.service'

/**
 * Display value of exchange rate with minimal transition to avoid flickering
 */

const MotionText = motion(Label)

interface ExchangeValueAmountProps extends LabelProps {
  amount: BigNumberish
  rate: ExchangeRate | undefined
}

export function ExchangeValueAmount({
  amount,
  children,
  rate,
  ...props
}: ExchangeValueAmountProps) {
  const isValidRate = useMemo(
    () => !(!!amount && rate?.rawConversion === 0),
    [amount, rate]
  )
  const isZero = useMemo(() => amount === '0', [amount])
  const isValid = useMemo(() => isValidRate || isZero, [isValidRate, isZero])

  return (
    <>
      {!!isValid && (
        <MotionText
          size="xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          {...props}
        >
          {rate?.conversion ? `$${rate.conversion} USD` : ''}
        </MotionText>
      )}
    </>
  )
}
