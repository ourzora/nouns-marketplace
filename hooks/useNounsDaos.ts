import useSWR from 'swr'
import { zoraApiFetcher } from '@shared'
import { NounsDaosQuery } from 'types/zora.api.generated'
import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

export type AuctionVolumeReturnType =
  | {
      chainTokenPrice: number
      totalCount: number
      usdcPrice: number
    }
  | undefined

export function useNounsDaos() {
  const { data, error } = useSWR<NounsDaosQuery>([`noundsDaos`], () =>
    zoraApiFetcher(NOUNS_DAOS_QUERY)
  )

  return {
    daos: data?.nouns?.nounsDaos?.nodes,
    error,
  }
}
