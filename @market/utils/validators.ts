import { isAddress } from './format'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { number } from 'yup'

export const contractShareValidator = number()
  .transform((value) => (isNaN(value) ? undefined : value))
  .min(0)
  .integer('Must be a non decimal value')
  .lessThan(100)

export function isAddressMatch(a: string = '', b: string = '') {
  if (isAddress(a) && isAddress(b))
    return getAddress(a).toLowerCase() === getAddress(b).toLowerCase()
  return false
}

export function isBurned(nft: NFTObject) {
  return nft?.nft?.owner?.address && isAddressMatch(nft?.nft?.owner.address, AddressZero)
}

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
