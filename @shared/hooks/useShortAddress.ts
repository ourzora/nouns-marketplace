import { useMemo } from 'react'

export const useShortAddress = (address: string | undefined | null): string | undefined =>
  useMemo(() => {
    if (address)
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }, [address])
