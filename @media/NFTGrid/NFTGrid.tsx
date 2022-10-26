import { NFTProvider } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Grid, GridProps, Stack } from '@zoralabs/zord'

import { NFTGridLoadMore } from './NFTGridLoadMore'

export interface NFTGridProps extends GridProps {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd: boolean | undefined
  handleLoadMore?: () => void
  nftRenderer: JSX.Element
}

export function NFTGrid({
  items,
  isValidating,
  isReachingEnd,
  handleLoadMore,
  nftRenderer,
  ...props
}: NFTGridProps) {
  return (
    <>
      <Stack gap="x14" pb="x10">
        <Grid {...props} p="x0">
          {items.map((nft) => (
            <NFTProvider
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              contractAddress={nft?.nft?.contract.address}
              tokenId={nft?.nft?.tokenId}
              initialData={nft}
            >
              {nftRenderer}
            </NFTProvider>
          ))}
        </Grid>
      </Stack>
      {!isReachingEnd && (
        <NFTGridLoadMore
          showObserver={true}
          isValidating={isValidating}
          handleLoadMore={handleLoadMore}
        />
      )}
    </>
  )
}
