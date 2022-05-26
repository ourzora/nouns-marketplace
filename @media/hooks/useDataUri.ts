import { useMemo } from 'react'

export function useDataUri(src: string) {
  const imgSrc: string = useMemo(() => {
    console.log(src.startsWith('data:image/svg+xml;'))
    return src
  }, [src])

  return {
    imgSrc,
  }
}
