import { Text, Box, Flex, Stack, Heading } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '../../hooks/useRelevantMarket'
import { ModalComposition } from '@modal'
import { FillAsk } from '../../wizards/FillAsk'
import { lightFont } from '../MarketComponents.css'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTOwner } from '../NFTOwner'
import { ListToken } from './ListToken'
import { V3Ask } from './V3Ask'

export function NFTCardMarket({ nftData }: { nftData: NFTObject }) {
  const { metadata, media, nft, markets } = nftData

  return (
    <>
      {markets && markets.length ? (
        <V3Ask nftData={nftData} />
      ) : (
        <ListToken nftData={nftData} />
      )}
    </>
  )
}
