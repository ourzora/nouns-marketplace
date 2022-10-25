import useSWR from 'swr'
import { OneNounsDaoQuery } from 'types/zora.api.generated'

import { ONE_NOUNS_DAO } from 'data/oneNounceDao'

import { zoraApiFetcher } from '@shared'

export function useOneNounsDao({ contractAddress }: { contractAddress: string }) {
  const { data, error } = useSWR<OneNounsDaoQuery>(
    [`nounish-auction-${contractAddress}`],
    () => zoraApiFetcher(ONE_NOUNS_DAO, { contractAddress })
  )

  if (error || !data) {
    error ? console.error(error) : console.error(`No data for ${contractAddress}`)
    return {
      dao: undefined,
      error,
    }
  }

  return {
    dao:
      data.nouns.nounsDaos.nodes.length > 0 ? data.nouns.nounsDaos.nodes[0] : undefined,
    error,
  }
}
