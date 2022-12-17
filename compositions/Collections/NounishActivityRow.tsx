import { NounishAuction, useOneNounsDao } from '@noun-auction'

export function NounishActivityRow(collectionAddress: string, tokenId: string) {
  const { dao } = useOneNounsDao({ collectionAddress })

  if (collectionAddress || !tokenId) return null
  if (!dao) return null

  return (
    <NounishAuction
      key={`${collectionAddress}`}
      dao={dao}
      showLabels
      hideCollectionTitle={false}
      borderRadius="curved"
      borderColor="text3"
      p="x4"
    />
  )
}
