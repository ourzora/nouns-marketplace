import { transformNFTZDKAlpha } from '@zoralabs/nft-hooks/dist/backends'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import {
  Chain,
  Collection,
  CollectionStatsAggregateQuery,
  MarketCategory,
  Network,
  SortDirection,
  TokenSortKey,
} from '@zoralabs/zdk-alpha/dist/queries/queries-sdk'
import { NFTObject } from '@zoralabs/nft-hooks'
import { GetServerSideProps } from 'next'
import { zdkAlphaService } from 'utils/zdk'
import { buildCollectionSEO, SeoProps } from 'utils/seo'

export type CollectionServiceProps = {
  initialPage: NFTObject[]
  contractAddress: string
  aggregateStats: CollectionStatsAggregateQuery
  collection: Collection
  seo: SeoProps
}

type CollectionProps = {
  address: string
}

interface CollectionParamsProps extends GetServerSideProps {
  params?: CollectionProps
}

export async function collectionService({ params }: CollectionParamsProps) {
  // assert(params, 'Page template must provide a params object')
  const tokenAddress = params ? params.address : process.env.NEXT_PUBLIC_DEFAULT_CONTRACT

  if (!tokenAddress) return false

  try {
    const resp = await zdkAlphaService.tokens({
      where: {
        collectionAddresses: [tokenAddress],
      },
      sort: {
        sortDirection: SortDirection.Desc,
        sortAxis: MarketCategory.Ask,
        sortKey: TokenSortKey.EthPrice,
      },
      pagination: {
        limit: 8,
      },
    })

    const initialPage = resp.tokens.nodes
      .map((token) => transformNFTZDKAlpha(token, { rawData: token }))
      .map(prepareJson)

    const networkInput = {
      chain: Chain.Mainnet, // TODO: enable additional chains
      network: Network.Ethereum,
    }

    const collection = await zdkAlphaService.collection({
      address: tokenAddress,
      network: networkInput,
      includeFullDetails: true,
    })

    if (!collection) {
      return {
        notFound: true,
        revalidate: 600,
      }
    }

    const { name, symbol } = collection

    const aggregateStats = await zdkAlphaService.collectionStatsAggregate({
      collectionAddress: tokenAddress,
      network: networkInput,
    })

    const seo = await buildCollectionSEO(name, symbol)

    return {
      props: {
        contractAddress: tokenAddress,
        initialPage,
        aggregateStats,
        collection,
        seo,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      if (err?.message.includes('404')) {
        return {
          notFound: true,
          revalidate: 60,
        }
      }
      console.warn(err.message)
    }
    throw err
  }
}
