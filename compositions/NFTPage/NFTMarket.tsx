import { returnDao } from 'constants/collection-addresses'

import { useMemo } from 'react'

import { NFTAsks } from '@market/components/NFTAsks'
import { NounishAuction, useActiveNounishAuction } from '@noun-auction'
import { NFTObject } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

import { NFTOffchainOrders } from './NFTOffchainOrders'
import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  contractAddress: string
  tokenId: string
  nft: NFTObject
  offchainOrders?: any
}

export function NFTMarket({
  offchainOrders,
  className,
  contractAddress,
  tokenId,
  nft,
}: NFTMarketProps) {
  const dao = useMemo(() => returnDao(contractAddress), [contractAddress])
  const { data: activeAuction } = useActiveNounishAuction(dao?.marketType)
  const hasNounishAuction = useMemo(
    () => activeAuction?.properties?.tokenId === tokenId && dao,
    [activeAuction?.properties?.tokenId, dao, tokenId]
  )
  const showOffchainOrders = useMemo(
    () => offchainOrders?.length > 0,
    [offchainOrders?.length]
  )

  return hasNounishAuction ? (
    <NounishAuction
      daoConfig={dao!}
      hideThumbnail
      hideTitle
      hideCollectionTitle
      showLabels
      layout="sideBarBid"
      useErrorMsg
      className={className}
    />
  ) : (
    <>
      {showOffchainOrders && (
        <NFTOffchainOrders nft={nft} offchainOrders={offchainOrders} />
      )}
      <NFTAsks
        className={[nftMarketWrapper, className]}
        nftObj={nft}
        p="x4"
        align="flex-start"
        direction="column"
      />
    </>
  )
}
