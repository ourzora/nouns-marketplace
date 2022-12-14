import { format } from 'date-fns'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'

import { useRelevantMarket } from '@market/hooks'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'

interface ListingDataTableProps {
  markets: ReturnType<typeof useToken>['markets']
}

export const useListingDataTable = ({ markets }: ListingDataTableProps) => {
  const { ask, isPrivateAsk } = useRelevantMarket(markets)

  const formattedListingDataTable = useMemo<DataTableItemProps[] | undefined>(
    () => [
      {
        label: 'Listing type',
        value: isPrivateAsk ? 'Private' : 'Fixed Price',
      },
      {
        label: 'Listed for',
        value: `${ask?.price?.nativePrice?.decimal} ETH`,
      },
      // not timestamp in db, only block number
      // {
      //   label: 'Listed at',
      //   value: format(new Date(ask.createdAt.timestamp), 'MMM d, y HH:mm:ss xxx'),
      // },
    ],
    [ask?.price?.nativePrice?.decimal, isPrivateAsk]
  )

  return {
    formattedListingDataTable,
  }
}
