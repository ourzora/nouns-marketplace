import { Grid, Stack, GridProps } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTGridLoadMore } from './NFTGridLoadMore'
import { nftGridWrapper } from '../NftMedia.css'
import { NFTProvider } from '@shared'

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
        <Grid {...props}>
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
