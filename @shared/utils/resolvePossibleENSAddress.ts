import { isAddress } from '@shared/utils/isAddress'

import { defaultProvider } from './connectors'

// Returns an address when passed either an address or ENS domain
export async function resolvePossibleENSAddress(
  possibleENSAddress: string
): Promise<string | null> {
  return isAddress(possibleENSAddress)
    ? possibleENSAddress
    : await defaultProvider.resolveName(possibleENSAddress)
}
