import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

/**
 * Handle non-base64 SVGs
 * ** this hook temporarily works around normal usage of useSourceImage in Zora's nft-hooks package by handling URI-encoded images
 * @param token: TypeSafeToken
 * @returns uri as string
 */

export function useOptionalImageURIDecode(token: TypeSafeToken) {
  return useMemo(() => {
    if (token?.image.mimeType === 'image/svg+xml') {
      const uri = token?.image?.url
      return uri?.includes('data:image/svg+xml') ? uri : `data:image/svg+xml,${uri}` // proper handling of URI-encoded SVG
    } else {
      // FIXME: will take some data massage
      // @ts-ignore-next-line
      return token?.image?.mediaEncoding?.poster ?? ''
    }
  }, [token?.image])
}
