import { useMemo } from 'react'

import { RowLoader } from './RowLoader'

export function AuctionRow({
  auctionDataComponent,
  activeAuctionComponent,
  tokenId,
  activeAuctionId,
  name,
}: {
  auctionDataComponent: JSX.Element
  activeAuctionComponent: JSX.Element
  tokenId: string
  activeAuctionId: string
  name: string
}) {
  const auctionComponent = useMemo(() => {
    const isActiveAuction = activeAuctionId === tokenId
    return isActiveAuction ? activeAuctionComponent : auctionDataComponent
  }, [activeAuctionComponent, activeAuctionId, auctionDataComponent, tokenId])

  if (!activeAuctionId) return <RowLoader name={name} />

  return auctionComponent
}
