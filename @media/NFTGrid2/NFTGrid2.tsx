import { NFTCard } from '@media/NFTCard'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Grid, GridProps, Stack } from '@zoralabs/zord'

export interface NFTGridProps extends GridProps {
  items: NFTObject[]
  //   isValidating: boolean
  //   isReachingEnd: boolean | undefined
  //   handleLoadMore?: () => void
}

export function NFTGrid2({ items, ...props }: NFTGridProps) {
  return (
    <>
      <Stack gap="x14" pb="x10">
        <Grid {...props} p="x0">
          {items.map((nft) => (
            <NFTCard
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              contractAddress={nft?.nft?.contract.address}
              tokenId={nft?.nft?.tokenId}
              initialData={nft}
            />
          ))}
        </Grid>
      </Stack>
    </>
  )
}
