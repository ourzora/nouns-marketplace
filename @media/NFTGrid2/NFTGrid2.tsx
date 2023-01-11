import { TokenWithMarketsSummary } from 'types/zora.api.generated'

import { NFTCard2 } from '@media/NFTCard2'
import { Grid, GridProps, Stack } from '@zoralabs/zord'

import { nftPageWrapper } from './NFTGrid2.css'

export interface NFTGridProps extends GridProps {
  items: TokenWithMarketsSummary[]
  // allows skip computation of isOwner, when we know for sure
  isOwner?: boolean
  handleLoadMore?: () => void
  isReachingEnd?: boolean
  isValidating?: boolean
}

export function NFTGrid2({ items, ...props }: NFTGridProps) {
  return (
    <Stack className={nftPageWrapper} gap="x14" pb="x10">
      <Grid {...props} p="x0">
        {(items ?? []).map((nft) => {
          const { collectionAddress, tokenId, collectionName, name, owner, image } =
            nft.token

          return (
            <NFTCard2
              isOwner={props.isOwner}
              ownerAddress={owner ?? undefined}
              key={`${collectionAddress}-${tokenId}`}
              tokenId={tokenId}
              collectionAddress={collectionAddress}
              collectionName={collectionName ?? '..'}
              tokenName={name ?? '..'}
              image={image ?? null}
              markets={nft.marketsSummary}
            />
          )
        })}
      </Grid>
    </Stack>
  )
}
