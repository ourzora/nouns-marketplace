import {
  Collection,
  CollectionStatsAggregateQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { NFTObject } from '@zoralabs/nft-hooks'
import { GetServerSideProps } from 'next'
import { zdk } from '@shared'
import { buildCollectionSEO, SeoProps } from 'utils/seo'
import { allAddresses } from 'constants/collection-addresses'
import { NetworkInput } from 'utils/network'

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
    const collection = await zdk.collection({
      address: tokenAddress,
      network: NetworkInput,
      includeFullDetails: false,
    })

    if (!collection) {
      return {
        notFound: true,
        revalidate: 600,
      }
    }

    const { name, symbol } = collection

    const seo = await buildCollectionSEO(name, symbol)

    return {
      props: {
        contractAddress: tokenAddress,
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
