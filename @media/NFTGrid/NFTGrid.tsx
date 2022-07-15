import { Grid, Stack } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCard } from '../NFTCard/NFTCard'
import { NFTGridLoadMore } from './NFTGridLoadMore'
import { nftGridWrapper } from '../NftMedia.css'

export type NFTGridProps = {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd: boolean | undefined
  handleLoadMore?: () => void
}

export function NFTGrid({
  items,
  isValidating,
  isReachingEnd,
  handleLoadMore,
}: NFTGridProps) {
  // console.log('NFTS', items)
  return (
    <>
      <Stack gap="x14" pb="x10">
        <Grid gap="x4" className={nftGridWrapper}>
          {items.map((nft) => (
            <NFTCard
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              nftData={nft}
            />
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
