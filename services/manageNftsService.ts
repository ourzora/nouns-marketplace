// import { transformNFTZDK } from '@zoralabs/nft-hooks/dist/backends'
// import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
// import { } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { NFTObject } from '@zoralabs/nft-hooks'
import { GetServerSideProps } from 'next'
import { zdkService } from 'utils/zdk'
import { assert } from 'console'
import { defaultProvider } from '@market/utils/connectors'
import { isAddress } from 'utils/address'

export type ManageNFTsServiceProps = {
  initialPage?: NFTObject[] | []
  ownerAddress: string
}

type ManageParams = {
  address: string
}

interface ManageNftsProps extends GetServerSideProps {
  params: ManageParams
}

export async function manageNftsService({ params }: ManageNftsProps) {
  assert(params, 'User template must provide a params object with an address')
  let initialPage: NFTObject[] | [] = []

  const ownerAddress = isAddress(params.address)
    ? params.address
    : await defaultProvider.resolveName(params.address)

  if (!ownerAddress || !isAddress(ownerAddress)) {
    return {
      notFound: true,
      revalidate: 600,
    }
  }

  return {
    props: {
      initialPage,
      ownerAddress,
    },
  }
}
