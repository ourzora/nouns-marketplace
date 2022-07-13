import {
  ActiveAuction,
  NounishMarketTypes,
  useActiveNounishAuctionQuery,
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

  const { activeToken } = useActiveNounishAuctionQuery({
    marketType: dao.marketType,
    contractAddress: contractAddress,
  })

  console.log(activeToken)

  if (tokenId === activeToken) {
    return (
      <ActiveAuction
        contractAddress={contractAddress}
        marketType={dao.marketType as NounishMarketTypes}
        hideThumbnail
        hideTitle
        backgroundColor="primary"
        borderColor="secondary"
        borderStyle="solid"
        borderWidth="normal"
        borderRadius="phat"
        wrapperDirection="column"
      />
    )
  } else {
    return marketComponent
  }
}
