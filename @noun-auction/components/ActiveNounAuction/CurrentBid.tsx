import { RawDisplayer } from 'components/utils'
import { useNounsAuctionProvider } from '@noun-auction/providers'

export function CurrentBid() {
  const { data, tokenId } = useNounsAuctionProvider()
  return <RawDisplayer data={{ data, tokenId }} />
}
