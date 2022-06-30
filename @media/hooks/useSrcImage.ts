import { useMemo } from 'react'

/**
 * use the svg data if available - falls back to media poster if not.
 * @param media
 * @returns srcImg
 */

export function useSourceImage(media: any) {
  const srcImg = useMemo(() => {
    if (media?.mimeType === 'image/svg+xml') {
      return media?.image?.uri
    } else {
      return media?.poster?.uri
    }
  }, [media])

  return {
    srcImg,
  }
}
