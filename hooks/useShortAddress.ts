import { useMemo } from 'react'

export const useShortAddress = (address: string): string =>
  useMemo(() => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }, [address])
