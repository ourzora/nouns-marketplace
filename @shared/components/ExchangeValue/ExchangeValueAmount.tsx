import { AddressZero } from '@ethersproject/constants'
import { Maybe } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Label, LabelProps } from '@zoralabs/zord'
// import { useExchangeValue } from 'hooks/useExchangeValue'
import { isNumber } from 'lodash'
import { useMemo } from 'react'

/**
 * Display value of exchange rate with minimal transition to avoid flickering
 */

interface ExchangeValueAmountProps extends LabelProps {
  currencyAddress?: Maybe<string>
  amount?: string
  options?: any
}

export function ExchangeValueAmount({
  amount,
  currencyAddress = AddressZero,
  children,
  ...props
}: ExchangeValueAmountProps) {
  // const rate = useExchangeValue({ currencyAddress, amount })
  // const isValidRate = useMemo(
  //   () => isNumber(amount) && rate?.rawConversion !== 0,
  //   [amount, rate?.rawConversion]
  // )
  // const isZero = useMemo(() => amount === '0', [amount])
  // const isValid = useMemo(() => isValidRate || isZero, [isValidRate, isZero])
  // return isValid ? (
  //   <Label size="xs" {...props}>
  //     {rate?.conversion ? `$${rate.conversion} USD` : ''}
  //     {children}
  //   </Label>
  // ) : null
}
