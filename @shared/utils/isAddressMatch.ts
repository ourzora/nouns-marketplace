import { isAddress } from '@shared/utils/isAddress'
import { getAddress } from '@ethersproject/address'

export function isAddressMatch(a: string = '', b: string = '') {
  if (isAddress(a) && isAddress(b))
    return getAddress(a).toLowerCase() === getAddress(b).toLowerCase()
  return false
}
