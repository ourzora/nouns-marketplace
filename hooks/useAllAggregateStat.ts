// import useSWR from 'swr'
// import { AggStatQuery } from 'types/zora.api.generated'

// import { AGG_STAT_QUERY } from 'data/aggregateStat'

// import { zoraApiFetcher } from '@shared'

// type Params = {
//   addresses: string[]
// }

// export function useAggregateStat({ addresses }: Params) {
//   const { data, error } = useSWR<AggStatQuery>([`${address}-${tokenId}`], () =>
//     zoraApiFetcher(AGG_STAT_QUERY, {
//       address,
//       tokenId,
//     })
//   )

//   return {
//     stat: data?.aggregateStat,
//     error,
//   }
// }
