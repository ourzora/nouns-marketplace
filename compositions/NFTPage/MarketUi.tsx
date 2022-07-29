import { useMemo } from 'react'
import {
  NounishAuction,
  useActiveNounishAuctionQuery,
  useAuctionRPC,
} from '@noun-auction'
import { NFTCardMarket } from '@market'
import { returnDao } from 'constants/collection-addresses'
import { NFTObject } from '@zoralabs/nft-hooks'
import { nftMarketWrapper } from './NFTPage.css'

export function MarketUi({
  contractAddress,
  tokenId,
  nft,
}: {
  contractAddress: string
  tokenId: string
  nft: NFTObject
}) {
  const dao = returnDao(contractAddress)

  const marketComponent = (
    <NFTCardMarket
      className={nftMarketWrapper}
      nftData={nft}
      p="x4"
      align="flex-start"
      direction="column"
    />
  )

  if (!dao) return marketComponent

  const { data: rpcData } = useAuctionRPC(dao.auctionContractAddress)

  const isActiveToken = useMemo(() => rpcData?.auction?.nounId === tokenId, [rpcData])

  if (isActiveToken) {
    return (
      <NounishAuction
        daoConfig={dao}
        hideThumbnail
        hideTitle
        hideCollectionTitle
        showLabels
        layout="sideBarBid"
        useErrorMsg
      />
    )
  } else {
    return marketComponent
  }
}
