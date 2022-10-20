import { RawDisplayer } from 'components/utils'

import { NFTCard } from '@media/NFTCard'
import { NFTProvider } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, Heading } from '@zoralabs/zord'

export function TestNftData({ data }: { data: NFTObject }) {
  return (
    <>
      <Heading>{data?.metadata?.name}</Heading>
      <NFTProvider
        key={`${data?.nft?.contract.address}-${data?.nft?.tokenId}`}
        contractAddress={data?.nft?.contract.address}
        tokenId={data?.nft?.tokenId}
        initialData={data}
      >
        <Box style={{ width: '400px' }}>{data && <NFTCard />}</Box>
      </NFTProvider>
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
