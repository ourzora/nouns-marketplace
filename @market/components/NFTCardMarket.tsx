import { useMemo } from 'react'
import {
  MARKET_INFO_STATUSES,
  NFTObject,
} from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '@market/hooks'
import { ListV3AskModal, FillV3AskModal } from '@market/components'
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
      if (
        (ask && ask.status === MARKET_INFO_STATUSES.ACTIVE) ||
        ask?.status === MARKET_INFO_STATUSES.COMPLETE
      )
        return <FillV3AskModal nftData={nftData} {...props} />
      else return <ListV3AskModal nftData={nftData} {...props} />
    } else return <ListV3AskModal nftData={nftData} {...props} />
  }, [ask, auction, markets])

  return marketComponent
}
