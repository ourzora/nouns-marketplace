import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { shortenAddress } from '@shared'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'

import { useNounishAuctionHelper } from './useNounishAuctionHelper'

interface AuctionDataTableProps {
  primaryAuction: TypeSafeNounsAuction
}

export const useAuctionDataTable = ({ primaryAuction }: AuctionDataTableProps) => {
  const { highestBidder, isEnded, countdownText, hasBid } = useNounishAuctionHelper({
    auction: primaryAuction,
  })

  const formattedAuctionDataTable = useMemo<DataTableItemProps[] | undefined>(() => {
    let table = hasBid
      ? [
          {
            label: 'Top bidder',
            value: shortenAddress(highestBidder),
          },
        ]
      : []

    const endsIn = {
      label: 'Ends in',
      value: isEnded ? 'ENDED' : countdownText,
    }

    table.push(endsIn)

    return table
  }, [countdownText, hasBid, highestBidder, isEnded])

  return {
    formattedAuctionDataTable,
  }
}
