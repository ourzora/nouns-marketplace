import { getAddress } from '@ethersproject/address'
import ErrorBoundary from 'components/common/ErrorBoundary'
import { Suspense } from 'react'
import exchangeService, { ExchangeRate } from 'services/exchange.service'
import useSWR from 'swr'
import { Maybe } from 'typings/indexer.generated'
import { isClientSide } from 'utils/window'

type CurrencyValueProps = {
  currencyAddress?: Maybe<string>
  amount?: string
  children: (rate?: ExchangeRate) => JSX.Element
  options?: any
}

/**
 * This context converts a currency amount to the exchange rate of the given currency.
 */

function ExchangeValueContext({
  currencyAddress,
  amount,
  children,
  options = {},
}: CurrencyValueProps) {
  const { data } = useSWR<ExchangeRate | undefined>(
    currencyAddress ? ['rate', currencyAddress, amount] : null,
    (_, contract, amount) =>
      exchangeService.fetchExchangeRate(getAddress(contract), amount),
    options
  )

  return children(data)
}

interface ExchangeValueProps extends CurrencyValueProps {
  fallback: JSX.Element | string
}

export function ExchangeValue({
  amount,
  fallback,
  children,
  ...props
}: ExchangeValueProps) {
  return (
    <>
      {isClientSide && (
        <ErrorBoundary>
          <Suspense fallback={fallback}>
            <ExchangeValueContext amount={amount || '0'} {...props}>
              {(rate) => children(rate)}
            </ExchangeValueContext>
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  )
}
