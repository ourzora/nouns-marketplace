import { defaultProvider } from './connectors'

// Attempt to get ENS name for address. Falls back to address if unsuccessful.
export async function reverseLookupAddress(address: string): Promise<string | null> {
  const possibleENS = defaultProvider.lookupAddress(address)
  return possibleENS ?? address
}
