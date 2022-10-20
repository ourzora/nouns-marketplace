import useSWR from 'swr'
import { zoraApiFetcher } from '@shared'
import { NounishAuctionsQuery, OneNounsDaoQuery } from 'types/zora.api.generated'
import { ONE_NOUNS_DAO } from 'data/oneNounceDao'

export function useOneNounsDao({ contractAddress }: { contractAddress: string }) {
  const { data, error } = useSWR<OneNounsDaoQuery>(
    [`nounish-auction-${contractAddress}`],
    () => zoraApiFetcher(ONE_NOUNS_DAO, { contractAddress })
  )

  if (error || !data) {
    error ? console.error(error) : console.error(`No data for ${contractAddress}`)
    return {
      auction: undefined,
    }
  }

  return {
    dao:
      data.nouns.nounsDaos.nodes.length > 0 ? data.nouns.nounsDaos.nodes[0] : undefined,
    error,
  }
}
