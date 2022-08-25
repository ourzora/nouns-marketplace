import { defaultProvider } from './connectors'
import { isAddress } from '@shared/utils/isAddress'

export async function resolvePossibleENSAddress(
  possibleENSAddress: string
): Promise<string | null> {
  return isAddress(possibleENSAddress)
    ? possibleENSAddress
    : await defaultProvider.resolveName(possibleENSAddress)
}
