import { useMemo } from 'react'
import { useNFT } from '@zoralabs/nft-hooks'

export function useTitleWithFallback(
  tokenContract: string,
  tokenId: string,
  defaultTitle?: string
) {
  const { data } = useNFT(tokenContract, tokenId)

  const placeHolder = defaultTitle ? defaultTitle : '...'

  const title = useMemo(() => {
    if (data)
      return data?.metadata?.name
        ? data?.metadata?.name
        : `${data?.nft?.contract?.name} ${data?.nft?.tokenId}`
  }, [data])

  return {
    fallbackTitle: title ? title : placeHolder,
  }
}
