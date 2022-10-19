import { isNaN } from 'lodash'

import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'

export const validateCurrency = (
  amount: string | number,
  label: string = 'Amount',
  decimals: number = 18
) => {
  if (!amount) {
    return `${label} is required`
  }

  if (isNaN(amount)) {
    return `Invalid ${label}, should be a number` // Guard against non-numeric amount. Note: <input> _should_ have type="number" specified
  }

  if (Number(amount) === 0) {
    return 'Must be greater than 0'
  }

  let newValue: BigNumber
  try {
    newValue = parseUnits(amount.toString(), decimals)
  } catch (e) {
    // don't update the input on invalid values
    return `Invalid ${label}`
  }

  if (!newValue.gt('0')) {
    return 'Must be greater than 0'
  }

  return
}
