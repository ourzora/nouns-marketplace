import { defaultProvider } from './connectors'
import { isAddress } from '@shared/utils/isAddress'

// Returns an address when passed either an address or ENS domain
export async function resolvePossibleENSAddress(
  possibleENSAddress: string
): Promise<string | null> {
  return isAddress(possibleENSAddress)
    ? possibleENSAddress
    : await defaultProvider.resolveName(possibleENSAddress)
}
