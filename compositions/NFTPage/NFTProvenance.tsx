import { TypeSafeToken } from 'validators/token'

import { usePrimaryAuctionDataTable } from '@market/modules/PrivateAsk/hooks/usePrimaryAuctionDataTable'
import { DataTable } from '@shared/components'
import { BoxProps } from '@zoralabs/zord'

interface NFTProvenanceProps extends BoxProps {
  token: TypeSafeToken
  primarySalePrice: string
}

export function NFTProvenance({ token, primarySalePrice }: NFTProvenanceProps) {
  const { formattedAuctionDataTable } = usePrimaryAuctionDataTable({
    token,
    primarySalePrice,
  })

  return <DataTable items={formattedAuctionDataTable} />
}
