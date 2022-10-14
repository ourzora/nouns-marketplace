import { useMemo } from 'react'

import { useNFT } from '@zoralabs/nft-hooks'

export function useTitleWithFallback({
  contractAddress,
  tokenId,
  defaultTitle,
}: {
  contractAddress?: string
  tokenId?: string
  defaultTitle?: string
}) {
  const { data } = useNFT(contractAddress, tokenId)
  const placeHolder = defaultTitle ?? '...'

  const title = useMemo(() => {
    if (data)
      return data?.metadata?.name ?? `${data?.nft?.contract?.name} ${data?.nft?.tokenId}`
  }, [data])

  return {
    fallbackTitle: title ?? placeHolder,
  }
}
