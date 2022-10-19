import { returnDao } from 'constants/collection-addresses'

import { NounishAuction } from '@noun-auction'
import { useNFTProvider } from '@shared'

export function NounishActivityRow() {
  const {
    hooksData: { data },
    contractAddress,
    tokenId,
  } = useNFTProvider()

  if (!data || !contractAddress || !tokenId) return null

  const dao = returnDao(contractAddress)

  if (!dao) return null

  return (
    <NounishAuction
      key={`${contractAddress}`}
      daoConfig={dao}
      showLabels
      hideCollectionTitle={false}
      borderRadius="curved"
      borderColor="text3"
      tokenId={tokenId}
      p="x4"
    />
  )
}
