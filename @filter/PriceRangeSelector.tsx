import { useCallback, useEffect, useMemo, useState } from 'react'

import { Currency } from '@shared'
import { Flex, InputField, Paragraph } from '@zord'

import { errorText } from './CollectionsFilter.css'
import { CurrencySelect } from './CurrencySelect'
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
  minPlaceholder?: string
  maxPlaceholder?: string
}

export function PriceRangeSelector({
  currencyOptions = [],
  onSelect,
  step = 0.01,
  minPlaceholder = 'Min',
  maxPlaceholder = 'Max',
}: PriceRangeSelectorProps) {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [currency, setCurrency] = useState<Currency>(currencyOptions[0])

  const { enablePriceRange } = useCollectionFilters()

  const minHandler = useCallback((e) => {
    setMinValue(parseFloat(e.target.value))
  }, [])

  const maxHandler = useCallback((e) => {
    setMaxValue(parseFloat(e.target.value))
  }, [])

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
        <InputField
          name="from"
          step={step}
          type="number"
          onChange={minHandler}
          placeholder={minPlaceholder}
          min={0}
          affix="ETH"
        />
        <InputField
          name="to"
          step={step}
          type="number"
          onChange={maxHandler}
          placeholder={maxPlaceholder}
          min={0}
          affix="ETH"
        />
        {!enablePriceRange?.hideCurrencySelect && (
          <CurrencySelect
            options={currencyOptions}
            name="currency"
            variant="greyPill"
            onChange={currencySelectHandler}
          />
        )}
      </Flex>

      {error && (
        <Paragraph className={errorText} size="sm">
          {error}
        </Paragraph>
      )}
    </Flex>
  )
}
