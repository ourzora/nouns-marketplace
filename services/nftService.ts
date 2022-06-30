import { GetServerSideProps } from 'next'
import { assert } from 'console'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import { GALACTUS_BASE_URL } from 'utils/env-vars'

const zdkFetchStrategy = new ZDKFetchStrategy('1', GALACTUS_BASE_URL)

export type NFTProps = {
  address: string
  tokenId: string
}

export interface NFTParamsProps extends GetServerSideProps<NFTProps> {
  params: NFTProps
}

export async function nftService({ params }: NFTParamsProps) {
  assert(params, 'Page template must provide a params object')

  const nft = prepareJson(await zdkFetchStrategy.fetchNFT(params.address, params.tokenId))

  if (!nft) {
    return {
      notFound: true,
      revalidate: 600,
    }
  }

  return { props: { nft } }
}
