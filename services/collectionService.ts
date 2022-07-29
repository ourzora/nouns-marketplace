import { transformNFTZDK } from '@zoralabs/nft-hooks/dist/backends'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import {
  Chain,
  Collection,
  CollectionStatsAggregateQuery,
  Network,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { NFTObject } from '@zoralabs/nft-hooks'
import { GetServerSideProps } from 'next'
import { zdk } from '@shared/utils/zdk'
import { buildCollectionSEO, SeoProps } from 'utils/seo'
import { allAddresses } from 'constants/collection-addresses'

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
  const tokenAddress = params
    ? params.address.toLowerCase()
    : process.env.NEXT_PUBLIC_DEFAULT_CONTRACT

  if (!tokenAddress) return false

  if (tokenAddress && !allAddresses.includes(tokenAddress)) {
    return {
      notFound: true,
    }
  }

  try {
    let resp
    /*
    try {
      resp = await zdk.tokens({
        where: {
          collectionAddresses: [tokenAddress],
        },
        filter: {},
        pagination: {
          limit: 1,
        },
        includeFullDetails: true,
      })
    } catch (err) {
      resp = await zdk.tokens({
        where: {
          collectionAddresses: [tokenAddress],
        },
        pagination: {
          limit: 1,
        },
      })
    }

    const initialPage = resp.tokens.nodes
      .map((token) => transformNFTZDK(token, { rawData: token }))
      .map(prepareJson)
    */
    const networkInput = {
      chain: Chain.Mainnet, // TODO: enable additional chains
      network: Network.Ethereum,
    }

    const collection = await zdk.collection({
      address: tokenAddress,
      network: networkInput,
      includeFullDetails: false,
    })

    if (!collection) {
      return {
        notFound: true,
        revalidate: 600,
      }
    }

    const { name, symbol } = collection

    const aggregateStats = await zdk.collectionStatsAggregate({
      collectionAddress: tokenAddress,
      network: networkInput,
    })

    const seo = await buildCollectionSEO(name, symbol)

    return {
      props: {
        contractAddress: tokenAddress,
        // initialPage,
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
