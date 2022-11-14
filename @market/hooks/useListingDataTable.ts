import { format } from 'date-fns'

import { useMemo } from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'
import { NFTObject } from '@zoralabs/nft-hooks'

interface ListingDataTableProps {
  nft: NFTObject
}

export const useListingDataTable = ({ nft: nftObj }: ListingDataTableProps) => {
  const { markets } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { isPrivateAsk } = useAskHelper({ ask })

  const formattedListingDataTable = useMemo<DataTableItemProps[] | undefined>(
    () => [
      {
        label: 'Listing type',
        value: isPrivateAsk ? 'Private' : 'Fixed Price',
      },
      {
        label: 'Listed for',
        value: `${ask?.amount?.eth?.value} ETH`,
      },
      {
        label: 'Listed at',
        value: format(new Date(ask.createdAt.timestamp), 'MMM d, y HH:mm:ss xxx'),
      },
    ],
    [ask?.amount?.eth?.value, ask.createdAt, isPrivateAsk]
  )

  return {
    formattedListingDataTable,
  }
}
