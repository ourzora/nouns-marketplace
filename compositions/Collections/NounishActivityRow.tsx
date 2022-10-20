import { NounishAuction, useOneNounsDao } from '@noun-auction'
import { useNFTProvider } from '@shared'

export function NounishActivityRow() {
  const {
    hooksData: { data },
    contractAddress,
    tokenId,
  } = useNFTProvider()

  // FIXME: get rid of useNFTProvider
  const { dao } = useOneNounsDao({ contractAddress })

  if (!data || !contractAddress || !tokenId) return null
  if (!dao) return null

  return (
    <NounishAuction
      key={`${contractAddress}`}
      dao={dao}
      showLabels
      hideCollectionTitle={false}
      borderRadius="curved"
      borderColor="tertiary"
      tokenId={tokenId}
      p="x4"
    />
  )
}
