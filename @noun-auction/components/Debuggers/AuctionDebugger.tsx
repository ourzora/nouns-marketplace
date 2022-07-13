import { RawDisplayer } from 'components/utils'
import { useNounishAuctionProvider } from '@noun-auction'

export function AuctionDebugger() {
  const { data, auctionConfigParams } = useNounishAuctionProvider()

  return <RawDisplayer data={{ data, auctionConfigParams }} />
}
