import { NFTObject } from '@zoralabs/nft-hooks'
import { GetServerSideProps } from 'next'
import { assert } from 'console'
import { defaultProvider, isAddress } from '@shared'

export type ManageNFTsServiceProps = {
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
