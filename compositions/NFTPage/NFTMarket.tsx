import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { NFTPrimaryAuction } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import {
  NounishAuction, // useActiveOGNounishAuction,
  useNounishAuctionQuery,
  useOneNounsDao,
} from '@noun-auction'
import { useNFT } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  tokenId: string
  token: TypeSafeToken
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTMarket({
  offchainOrders,
  className,
  collectionAddress,
  token,
  tokenId,
}: NFTMarketProps) {
  const { dao } = useOneNounsDao({ collectionAddress })
  // const { data: activeOGAuction } = useActiveOGNounishAuction()
  const { data: nftObj } = useNFT(collectionAddress, tokenId)

  // const hasActiveOGAuction = useMemo( // Nouns / LilNouns auction
  //   () => activeOGAuction?.properties?.tokenId === tokenId,
  //   [activeOGAuction?.properties?.tokenId, tokenId]
  // )

  const { activeAuction, hasActiveAuction } = useNounishAuctionQuery({
    // All other auctions
    collectionAddress,
  })

  // const { collectionAddress: activeAuctionCollectionAddress, endTime } = activeAuction
  // const { isEnded: auctionCompleted } = useIsAuctionCompleted({
  //   activeAuction,
  // })

  // claim: if you're the bidder
  // otherwise: show the active auction amount before it's claimed
  // if active: show the countdown + allow bids

  if (hasActiveAuction && dao) {
    console.log('ACTIVE', activeAuction)
    console.log('DAO', dao)

    return <NFTPrimaryAuction primaryAuction={activeAuction!} />

    // return (
    //   <NounishAuction
    //     dao={dao!}
    //     hideThumbnail
    //     hideTitle
    //     hideCollectionTitle
    //     showLabels
    //     layout="sideBarBid"
    //     useErrorMsg
    //     className={className}
    //   />
    // )
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
