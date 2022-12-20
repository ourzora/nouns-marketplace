import { TypeSafeToken } from 'validators/token'

import { usePrimaryAuctionDataTable } from '@market/modules/V3Ask/hooks'
import { DataTable } from '@shared/components'
import { BoxProps } from '@zord'

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
