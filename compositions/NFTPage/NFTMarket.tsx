import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { NFTPrimaryAuction } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import { useNounishAuctionQuery } from '@noun-auction'
import { useNFTProvider } from '@shared'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTMarket({
  offchainOrders,
  className,
  collectionAddress,
}: NFTMarketProps) {
  const { nft: nftObj } = useNFTProvider()
  const { activeAuction, hasActiveAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  if (hasActiveAuction && nftObj) {
    return <NFTPrimaryAuction nftObj={nftObj} primaryAuction={activeAuction!} />
  }

  if (nftObj) {
    return (
      <NFTAsks
        offchainOrders={offchainOrders}
        className={[nftMarketWrapper, className]}
        nftObj={nftObj}
        p="x4"
        align="flex-start"
        direction="column"
      />
    )
  }

  return null
}
