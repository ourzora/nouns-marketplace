import { useMemo } from 'react'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { RowLoader } from './RowLoader'

export function AuctionRow({
  auctionDataComponent,
  activeAuctionComponent,
}: {
  auctionDataComponent: JSX.Element
  activeAuctionComponent: JSX.Element
}) {
  const { tokenId, activeAuctionId } = useNounishAuctionProvider()
  const auctionComponent = useMemo(() => {
    if (activeAuctionId === tokenId) {
      return activeAuctionComponent
    } else {
      return auctionDataComponent
    }
  }, [activeAuctionComponent, activeAuctionId, auctionDataComponent, tokenId])

  if (!activeAuctionId) return <RowLoader />

  return auctionComponent
}
