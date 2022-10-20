import useSWR from 'swr'
import { zoraApiFetcher } from '@shared'
import { TokenQuery } from 'types/zora.api.generated'
import { TOKEN_QUERY } from 'data/token'

type Params = {
  address: string
  tokenId: string
}

export function useToken({ address, tokenId }: Params) {
  const { data, error } = useSWR<TokenQuery>([`${address}-${tokenId}`], () =>
    zoraApiFetcher(TOKEN_QUERY, {
      address,
      tokenId,
    })
  )

  if (error) {
    console.error(error)
  }

  return {
    token: data?.token?.token,
    error,
  }
}
