import * as styles from './CollectionsFilter.css'
import { isAddressMatch } from '@shared'
import { Box, BoxComponentProps, Select, Text } from '@zoralabs/zord'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Currency } from '@shared'

export interface CurrencySelectProps extends BoxComponentProps<'select'> {
  autoFocus?: boolean
  name?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options?: Currency[]
  variant?: keyof typeof styles.currencySelectVariants['variant']
}

const ICON_WIDTH = 32

export function CurrencySelect({
  autoFocus,
  placeholder,
  onChange,
  name,
  options = [],
  variant,
  ...props
}: CurrencySelectProps) {
  // @NOTE: Measure the width of the select element to set the width, due to limitation of the Select components.
  const inputRef = useRef<HTMLDivElement>(null)
  const [symbol, setSymbol] = useState<string | undefined>(options[0]?.symbol)
  const [minWidth, setMinWidth] = useState<number>(0)

  const getMinWidth = useCallback(() => {
    const padding = variant === 'large' ? 30 : 20
    const textWidth = inputRef?.current?.offsetWidth || ICON_WIDTH
    return textWidth + padding + ICON_WIDTH
  }, [variant])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = options.find((c) => isAddressMatch(c.id, e.target.value))
    setSymbol(currency?.symbol)
    if (onChange) onChange(e)
  }

  useLayoutEffect(() => {
    setMinWidth(getMinWidth())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol])

  return (
    <Box pos="relative" inset="x0" {...props}>
      <Text ref={inputRef} className={styles.symbolText({ variant })}>
        {symbol}
      </Text>

      <Select
        autoFocus={autoFocus}
        className={styles.currencySelect({ variant })}
        onChange={handleChange}
        name={name}
        style={{ minWidth }}
      >
        {placeholder && (
          <option value="Select Index" disabled>
            {placeholder}
          </option>
        )}
        {options.map((currency) => (
          <option key={currency.id} value={currency.id}>
            {currency.symbol}
          </option>
        ))}
      </Select>
    </Box>
  )
}
