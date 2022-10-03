import { NFTObject } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'
import { DataTable } from '@shared/components'
import { usePrimaryAuctionDataTable } from '@market/modules/PrivateAsk/hooks/usePrimaryAuctionDataTable'

interface NFTProvenanceProps extends BoxProps {
  nft: NFTObject
}

export function NFTProvenance({ nft }: NFTProvenanceProps) {
  const { formattedAuctionDataTable } = usePrimaryAuctionDataTable({
    nft: nft,
  })

  return <DataTable items={formattedAuctionDataTable} />
}
