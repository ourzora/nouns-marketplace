// import { transformNFTZDK } from '@zoralabs/nft-hooks/dist/backends'
// import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
// import { } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { NFTObject } from '@zoralabs/nft-hooks'
import { GetServerSideProps } from 'next'
import { zdkService } from 'utils/zdk'

export type ManageNFTsServiceProps = {
  initialPage?: NFTObject[] | []
  userAddress: string
}

type ManageParams = {
  address: string
}

interface ManageNftsProps extends GetServerSideProps {
  params?: ManageParams
}

export async function manageNftsService({ params }: ManageNftsProps) {
  const userAddress = params && params.address
  let initialPage: NFTObject[] | [] = []

  return {
    props: {
      initialPage,
      userAddress,
    },
  }
}
