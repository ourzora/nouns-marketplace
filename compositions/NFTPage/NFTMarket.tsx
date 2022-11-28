import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { useRelevantMarket } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import { NounishAuction, useActiveOGNounishAuction, useOneNounsDao } from '@noun-auction'
import { useIsOwner } from '@shared/hooks'
import { NFTObject, useNFT } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  tokenId: string
  token: TypeSafeToken
  nftObj: NFTObject
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTMarket({
  nftObj,
  offchainOrders,
  className,
  collectionAddress,
  token,
  tokenId,
}: NFTMarketProps) {
  const { dao } = useOneNounsDao({ collectionAddress })
  const { data: activeAuction } = useActiveOGNounishAuction()
  // const { data: nftObj } = useNFT(collectionAddress, tokenId)

  const hasNounishAuction = useMemo(
    () => activeAuction?.properties?.tokenId === tokenId,
    [activeAuction?.properties?.tokenId, tokenId]
  )

  // const { markets } = nftObj!
  // const { ask } = useRelevantMarket(markets)
  // const { isOwner } = useIsOwner(nftObj)

  console.log('In NFTMarket')
  console.log('TOKEN', token)

  if (hasNounishAuction && dao) {
    console.log('DAO')
    return (
      <NounishAuction
        dao={dao!}
        hideThumbnail
        hideTitle
        hideCollectionTitle
        showLabels
        layout="sideBarBid"
        useErrorMsg
        className={className}
      />
    )
  }

  if (nftObj) {
    console.log('HAS NFT OBJ')
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
