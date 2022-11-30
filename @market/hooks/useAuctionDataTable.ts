import { format, fromUnixTime, intervalToDuration } from 'date-fns'

import { useMemo, useState } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { shortenAddress, useInterval } from '@shared'
// import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'
import { NFTObject } from '@zoralabs/nft-hooks'

import { useNounishAuctionHelper } from './useNounishAuctionHelper'

interface AuctionDataTableProps {
  primaryAuction: TypeSafeNounsAuction
}

export const useAuctionDataTable = ({ primaryAuction }: AuctionDataTableProps) => {
  // const { markets } = nftObj

  const {
    highestBidder,
    endTime,
    isEnded,
    // now
    // countdownText
  } = useNounishAuctionHelper({
    auction: primaryAuction,
  })

  const [now, setNow] = useState(new Date())

  const countdownText = useMemo(() => {
    if (isEnded || !endTime) return ''

    const { hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: fromUnixTime(parseInt(endTime)),
    })

    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [isEnded, endTime, now])

  useInterval(() => setNow(new Date()), 1000)

  // const { ask } = useRelevantMarket(markets)
  // const { isPrivateAsk } = useAskHelper({ ask })

  const formattedAuctionDataTable = useMemo<DataTableItemProps[] | undefined>(
    () => [
      {
        label: 'Top bidder',
        value: shortenAddress(highestBidder),
      },
      {
        label: 'Ends in',
        // value: `10min`,
        value: countdownText,
      },
    ],
    [countdownText, highestBidder]
  )

  return {
    formattedAuctionDataTable,
  }
}
