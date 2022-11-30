import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { TypeSafeToken } from 'validators/token'

import { NFTPrimaryAuction } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import { useNounishAuctionQuery } from '@noun-auction'
import { useNFT } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  tokenId: string
  token: TypeSafeToken
  // nftObj: NFTObject
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTMarket({
  // nftObj,
  offchainOrders,
  className,
  collectionAddress,
  token,
  tokenId,
}: NFTMarketProps) {
  const { data: nftObj } = useNFT(collectionAddress, tokenId)
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
