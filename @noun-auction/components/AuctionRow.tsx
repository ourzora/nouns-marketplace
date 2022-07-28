import { useEffect, useMemo } from 'react'
import { ActiveAuction } from './ActiveAuction'
import { useNounishAuctionProvider } from '@noun-auction/providers'

export function AuctionRow({
  auctionDataComponent,
  activeAuctionComponent,
}: {
  auctionDataComponent: JSX.Element
  activeAuctionComponent: JSX.Element
}) {
  const { tokenId, activeAuctionId } = useNounishAuctionProvider()

  if (!activeAuctionId) return null

  useEffect(() => {
    console.log('activeAuctionId', activeAuctionId, tokenId)
  }, [activeAuctionId])

  const auctionComponent = useMemo(() => {
    if (activeAuctionId === tokenId) {
      return activeAuctionComponent
    } else {
      return auctionDataComponent
    }
  }, [activeAuctionId])

  return auctionComponent
}
