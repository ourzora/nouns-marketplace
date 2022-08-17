import { zdk } from '@shared'
import {
  MarketSortKey,
  MarketsQueryInput,
  SortDirection,
  TokenInput,
  TokenSortKey,
  V3Ask,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { useMemo } from 'react'
import { NetworkInput } from 'utils/network'
// import { zdkNetworkInput } from 'services/strategies'
// import { Token } from 'services/token.service'
import { fetchV3asks } from 'services/v3asks.service'
import useSWR from 'swr'
// import { V3Ask } from 'typings/indexer.generated'

// interface usePrivateAsksProps {
//   contractAddress?: string | null
// }

// type GetNFTReturnType = {
//   tokens: NFTObject[]
//   nextCursor?: string | null
// }

// export function usePrivateAsks({
//   // enableRefresh = true,
// }: usePrivateAsksProps) {

//   return {

//   }
// }

export const usePrivateAsks = ({
  collectionAddress,
  tokenId,
}: // initialV3Ask,
{
  // nft: NFTOb
  collectionAddress: string
  tokenId: string
  // initialV3Ask?: V3Ask[]
}) => {
  const { data: v3Asks } = useSWR(
    ['v3asks', collectionAddress, tokenId],
    (_, collectionAddress, tokenId) =>
      zdk.markets({
        networks: [NetworkInput],
        where: {
          collectionAddresses: [collectionAddress],
          tokens: [
            {
              address: collectionAddress,
              tokenId: tokenId,
            },
          ],
          // seller: //
        },
        filter: {},
        pagination: {
          limit: 24,
        },
        sort: {
          sortDirection: SortDirection.Desc,
          // sortAxis: MarketCategory.Ask,
          sortKey: MarketSortKey.ChainTokenPrice,
        },
        includeFullDetails: true,
      })
    // { initialData: initialV3Ask }
  )

  // const v3AskExists = useMemo(() => v3Asks && !!v3Asks[0], [v3Asks])
  const v3AskExists = useMemo(() => v3Asks && v3Asks !== undefined, [v3Asks])

  return {
    v3AskExists,
    v3Asks,
  }
}
