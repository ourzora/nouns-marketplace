import { NounishAuction, useOneNounsDao } from '@noun-auction'

export function NounishActivityRow({
  contractAddress,
  tokenId,
}: {
  contractAddress: string
  tokenId: string
}) {
  const { dao } = useOneNounsDao({ contractAddress })

  if (contractAddress || !tokenId) return null
  if (!dao) return null

  return (
    <NounishAuction
      key={`${contractAddress}`}
      dao={dao}
      showLabels
      hideCollectionTitle={false}
      borderRadius="curved"
      borderColor="text3"
      p="x4"
    />
  )
}
