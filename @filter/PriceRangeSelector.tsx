import { CurrencySelect } from './CurrencySelect'
import { errorText } from './CollectionsFilter.css'
import { Flex, Input, Paragraph } from '@zoralabs/zord'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Currency } from '@shared'
import { useCollectionFilters } from './providers'

export type PriceRangeReturnValue = {
  min: number
  max: number
  error: string | undefined
  currency: Currency
}

export interface PriceRangeSelectorProps {
  currencyOptions?: Currency[]
  onSelect: (value: PriceRangeReturnValue) => void
  step?: number
}

export function PriceRangeSelector({
  currencyOptions = [],
  onSelect,
  step = 0.01,
}: PriceRangeSelectorProps) {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [currency, setCurrency] = useState<Currency>(currencyOptions[0])

  const { usePriceRange } = useCollectionFilters()

  const minHandler = useCallback(
    (e) => {
      setMinValue(parseFloat(e.target.value))
    },
    [minValue]
  )

  const maxHandler = useCallback(
    (e) => {
      setMaxValue(parseFloat(e.target.value))
    },
    [maxValue]
  )

  const error = useMemo(() => {
    if (minValue > maxValue) {
      return 'Minimum price exceeds maximum'
    } else if (minValue === 0 && maxValue === 0) {
      return undefined
    } else if (minValue === maxValue) {
      return 'Maximum price must exceed minimum'
    } else {
      return undefined
    }
  }, [minValue, maxValue])

  const currencySelectHandler = useCallback(
    (e) => {
      setCurrency(e?.target?.value)
    },
    [setCurrency]
  )

  useEffect(() => {
    onSelect({
      min: minValue,
      max: maxValue,
      error: error,
      currency: currency,
    })
  }, [error, currency, onSelect, minValue, maxValue])

  return (
    <Flex direction="column" gap="x3">
      <Flex gap="x3">
        <Input
          step={step}
          type="number"
          onChange={minHandler}
          placeholder="Min"
          min={0}
          size="sm"
        />
        <Input
          step={step}
          type="number"
          onChange={maxHandler}
          placeholder="Max"
          min={0}
          size="sm"
        />
        {!usePriceRange?.hideCurrencySelect && (
          <CurrencySelect
            options={currencyOptions}
            name="currency"
            variant="greyPill"
            onChange={currencySelectHandler}
          />
        )}
      </Flex>

      {error && (
        <Paragraph className={errorText} size="xs">
          {error}
        </Paragraph>
      )}
    </Flex>
  )
}
