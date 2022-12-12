import { NounsTokensByOwnerAddressQuery } from 'types/zora.api.generated'

import { NFTCard2 } from '@media/NFTCard2'
import { Grid, GridProps, Stack } from '@zoralabs/zord'

import { nftPageWrapper } from './NFTGrid2.css'

export interface NFTGridProps extends GridProps {
  items: NounsTokensByOwnerAddressQuery['tokens']['nodes']
  // allows skip computation of isOwner, when we know for sure
  isOwner?: boolean
}

export function NFTGrid2({ items, ...props }: NFTGridProps) {
  return (
    <Stack className={nftPageWrapper} gap="x14" pb="x10">
      <Grid {...props} p="x0">
        {items.map((nft) => {
          const collectionAddress = nft.token.collectionAddress
          const tokenId = nft.token.tokenId

          console.log(nft.marketsSummary)

          return (
            <NFTCard2
              isOwner={props.isOwner}
              ownerAddress={nft?.token?.owner ?? undefined}
              key={`${collectionAddress}-${tokenId}`}
              tokenId={tokenId}
              collectionAddress={collectionAddress}
              collectionName={nft?.token?.collectionName ?? '..'}
              tokenName={nft?.token?.name ?? '..'}
              image={nft?.token?.image ?? null}
              markets={nft.marketsSummary}
            />
          )
        })}
      </Grid>
    </Stack>
  )
}
