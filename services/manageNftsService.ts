import { GetServerSideProps } from 'next'
import { NounsTokensByOwnerAddressQuery } from 'types/zora.api.generated'

import assert from 'assert'

import { TOKENS_BY_ADDRESS_QUERY } from 'data/tokensByAddress'

import { isAddress, zoraApiFetcher } from '@shared'
import { resolvePossibleENSAddress } from '@shared/utils/resolvePossibleENSAddress'

export type ManageNFTsServiceProps = {
  ownerAddress: string
  initialPage: NounsTokensByOwnerAddressQuery['tokens']['nodes']
}

type ManageParams = {
  address: string
}

interface ManageNftsProps extends GetServerSideProps {
  params: ManageParams
}

export async function manageNftsService({ params }: ManageNftsProps) {
  assert(params, 'User template must provide a params object with an address')

  const ownerAddress = await resolvePossibleENSAddress(params.address)

  if (!ownerAddress || !isAddress(ownerAddress)) {
    return {
      notFound: true,
      revalidate: 600,
    }
  }

  /**
   * Currently no way to query tokens based on their `nounishness`, we just get all tokens
   */
  const resp = await zoraApiFetcher(TOKENS_BY_ADDRESS_QUERY, {
    ownerAddress,
  })

  return {
    props: {
      initialPage: resp.tokens.nodes,
      ownerAddress,
    },
  }
}
