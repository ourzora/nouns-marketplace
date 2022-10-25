import { usePrimaryAuctionDataTable } from '@market/modules/PrivateAsk/hooks/usePrimaryAuctionDataTable'
import { DataTable } from '@shared/components'
import { NFTObject } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

interface NFTProvenanceProps extends BoxProps {
  nft: NFTObject
  primarySalePrice: string
}

export function NFTProvenance({ nft, primarySalePrice }: NFTProvenanceProps) {
  const { formattedAuctionDataTable } = usePrimaryAuctionDataTable({
    nft,
    primarySalePrice,
  })

  return <DataTable items={formattedAuctionDataTable} />
}
