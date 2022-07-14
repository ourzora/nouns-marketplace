import { useNounishAuctionProvider } from '@noun-auction'

// @shared
import { RawDisplayer } from 'components/utils'

export function AuctionDebugger() {
  const { data, daoConfig } = useNounishAuctionProvider()

  return <RawDisplayer data={{ data, daoConfig }} />
}
