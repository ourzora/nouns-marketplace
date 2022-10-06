import { NFTObject } from '@zoralabs/nft-hooks'
import { useMemo } from 'react'

/**
 * Handle non-base64 SVGs
 * ** this hook temporarily works around normal usage of useSourceImage in Zora's nft-hooks package
 * @param nft: NFTObject
 * @returns uri as string
 */

export function useOptionalImageURIDecode(nft: NFTObject) {
  return useMemo(() => {
    if (nft?.media?.mimeType === 'image/svg+xml') {
      const uri = nft?.media?.image?.uri
      return uri?.includes('data:image/svg+xml')
        ? uri
        : 'data:image/svg+xml;base64,' + window.btoa(decodeURIComponent(uri!)) // If SVG is encoded as URI and not base64, decode it and convert to base64
    } else {
      return nft?.media?.poster?.uri
    }
  }, [nft?.media])
}
