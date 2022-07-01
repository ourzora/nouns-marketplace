import { useMemo } from 'react'
import {
  MARKET_INFO_STATUSES,
  NFTObject,
} from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '../../hooks/useRelevantMarket'
import { ListToken } from './ListToken'
import { V3Ask } from './V3Ask'
import { ZoraReserveV2 } from './ZoraReserveV2'
import { FlexProps } from '@zoralabs/zord'

export interface NFTCardMarketProps extends FlexProps {
  nftData: NFTObject
}

export function NFTCardMarket({ nftData, ...props }: NFTCardMarketProps) {
  if (!nftData) return null

  const { markets } = nftData
  const { ask, auction } = useRelevantMarket(markets)

  const marketComponent = useMemo(() => {
    if (markets && markets.length > 0) {
      if (auction && auction.status === MARKET_INFO_STATUSES.ACTIVE)
        return <ZoraReserveV2 nftData={nftData} />

      if (
        (ask && ask.status === MARKET_INFO_STATUSES.ACTIVE) ||
        ask?.status === MARKET_INFO_STATUSES.COMPLETE
      )
        return <V3Ask nftData={nftData} {...props} />
      else return <ListToken nftData={nftData} {...props} />
    } else return <ListToken nftData={nftData} {...props} />
  }, [ask, auction, markets])

  return marketComponent
}
