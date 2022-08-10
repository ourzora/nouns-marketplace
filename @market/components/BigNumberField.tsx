import React, { useCallback, useEffect, useState } from 'react'
import { useField } from 'formik'
import { FieldValidator } from 'formik/dist/types'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { usePrevious } from '@reach/utils'
import { Input } from '@zoralabs/zord'

export interface BigNumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  decimals?: number
  name: string
  max?: string
  min?: string
  validate?: FieldValidator
  placeholder?: string
}

export const BigNumberField: React.FC<BigNumberFieldProps> = ({
  name,
  decimals = 18,
  min,
  max,
  validate,
  ...props
}) => {
  const [field, , helpers] = useField({ name, validate })
  const { value } = field
  const { setValue, setTouched } = helpers

  const [inputValue, setInputValue] = useState<string>('')
  const previousDecimals = usePrevious(decimals) || decimals

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      if (value === '') {
        setValue(value)
        setInputValue(value)
        return
      }

      let newValue: BigNumber
      try {
        newValue = parseUnits(value, decimals)
      } catch (e) {
        // don't update the input on invalid values
        return
      }

      const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max))
      if (invalidValue) {
        return
      }

      setInputValue(value)
      setValue(newValue.toString())
    },
    [decimals, max, min, setValue]
  )

  useEffect(() => {
    if (!value) {
      setInputValue('')
    } else {
      let parseInputValue

      try {
        parseInputValue = parseUnits(inputValue || '0', decimals)
      } catch {
        // do nothing
      }

      if (!parseInputValue || !parseInputValue.eq(value)) {
        try {
          const prev = formatUnits(value, previousDecimals)
          const next = parseUnits(prev, decimals).toString()

          setValue(next)
          setInputValue(prev)
        } catch (e: any) {
          setValue('')
          setInputValue('')
          console.error(e.message)
        }
      }
    }
  }, [decimals, inputValue, setValue, previousDecimals, value])

  return (
    <Input
      mb="x2"
      type="number"
      step="any"
      inputMode="decimal"
      value={inputValue}
      onChange={handleOnChange}
      /* @ts-ignore */
      sizeVariant="lg"
      onBlur={() => setTouched(true)}
      {...props}
    />
  )
}
