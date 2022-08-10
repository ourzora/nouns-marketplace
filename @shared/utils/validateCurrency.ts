import { BigNumber } from '@ethersproject/bignumber'

export const validateCurrency = ({ amount }: { amount: string | number }) => {
  if (amount === 0) {
    return 'Must be greater than 0'
  }
  if (!amount) {
    return 'Index amount is a required field'
  }

  if (!BigNumber.from(amount).gt('0')) {
    return 'Must be greater than 0'
  }

  return
}
