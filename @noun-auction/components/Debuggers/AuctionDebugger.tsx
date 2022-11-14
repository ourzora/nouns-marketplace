// @shared
import { RawDisplayer } from 'components/utils'

import { useNounishAuctionProvider } from '@noun-auction'

export function AuctionDebugger() {
  const { data, daoConfig } = useNounishAuctionProvider()

  return <RawDisplayer data={{ data, daoConfig }} />
}
