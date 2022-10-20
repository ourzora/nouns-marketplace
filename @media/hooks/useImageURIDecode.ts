import { useMemo } from 'react'

import { NFTObject } from '@zoralabs/nft-hooks'

/**
 * Handle non-base64 SVGs
 * ** this hook temporarily works around normal usage of useSourceImage in Zora's nft-hooks package by handling URI-encoded images
 * @param nft: NFTObject
 * @returns uri as string
 */

export function useOptionalImageURIDecode(nft: NFTObject) {
  return useMemo(() => {
    if (nft?.media?.mimeType === 'image/svg+xml') {
      const uri = nft?.media?.image?.uri
      return uri?.includes('data:image/svg+xml') ? uri : `data:image/svg+xml,${uri}` // proper handling of URI-encoded SVG
    } else {
      return nft?.media?.poster?.uri
    }
  }, [nft?.media])
}
