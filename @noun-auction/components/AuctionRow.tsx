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
    const isActiveAuction = activeAuctionId === tokenId
    return isActiveAuction ? activeAuctionComponent : auctionDataComponent
  }, [activeAuctionComponent, activeAuctionId, auctionDataComponent, tokenId])

  if (!activeAuctionId) return <RowLoader />

  return auctionComponent
}
