import { GetServerSideProps } from 'next'

import assert from 'assert'

import { isAddress } from '@shared'
import { resolvePossibleENSAddress } from '@shared/utils/resolvePossibleENSAddress'
import { NFTObject } from '@zoralabs/nft-hooks'

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

  const ownerAddress = await resolvePossibleENSAddress(params.address)

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
