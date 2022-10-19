import { getAddress } from '@ethersproject/address'
import { isAddress } from '@shared/utils/isAddress'

export function isAddressMatch(a: string = '', b: string = '') {
  if (isAddress(a) && isAddress(b))
    return getAddress(a).toLowerCase() === getAddress(b).toLowerCase()
  return false
}
