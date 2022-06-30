import { NFTObject } from '@zoralabs/nft-hooks'
import { Heading, Box } from '@zoralabs/zord'
import { RawDisplayer } from 'components/utils'
import { NFTCard } from '@media/NFTCard'

export function TestNftData({ data }: { data: NFTObject }) {
  return (
    <>
      <Heading>{data?.metadata?.name}</Heading>
      <Box style={{ width: '400px' }}>{data && <NFTCard nftData={data} />}</Box>
      <Heading>Last Refresh Time</Heading>
      <RawDisplayer data={data?.rawData?.APIIndexer?.lastRefreshTime} />
      <Heading>Markets</Heading>
      {data?.markets &&
        data?.markets.map((data) => (
          <RawDisplayer
            key={data.createdAt.transactionHash}
            data={{ ...data?.createdAt, status: data?.status }}
          />
        ))}
      <RawDisplayer data={data?.markets} />
      <Heading>ALL NFT DATA - via useNFT nfthooks</Heading>
      <RawDisplayer data={data} />
    </>
  )
}
