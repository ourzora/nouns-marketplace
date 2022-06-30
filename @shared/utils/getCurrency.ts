import { Currency } from './../constants/currencies'
import { ETH_CURRENCY_SHIM, SUPPORTED_CURRENCIES } from '@shared/constants'
import { isAddressMatch } from './validators'

export function getCurrency({ address }: { address: string }) {
  return [ETH_CURRENCY_SHIM, ...SUPPORTED_CURRENCIES].find((c) =>
    isAddressMatch(c.id, address)
  ) as Currency
}
