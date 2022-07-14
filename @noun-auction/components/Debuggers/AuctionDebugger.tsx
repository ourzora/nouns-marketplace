import { useNounishAuctionProvider } from '@noun-auction'

// @shared
import { RawDisplayer } from 'components/utils'

export function AuctionDebugger() {
  const { data, auctionConfigParams } = useNounishAuctionProvider()

  return <RawDisplayer data={{ data, auctionConfigParams }} />
}
