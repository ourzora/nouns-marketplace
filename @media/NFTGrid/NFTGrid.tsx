import { Grid, Button, Stack, Flex } from '@zoralabs/zord'
import { useTokensQuery } from '@media/hooks/useTokensQuery'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCard } from '../NFTCard/NFTCard'
import { nftGridWrapper } from '../NftMedia.css'

export type NFTGridProps = {
  contractAddress?: string[]
  ownerAddress?: string
  initialPage?: NFTObject[]
  cardMarketComponent?: JSX.Element
}

export function NFTGrid({
  contractAddress,
  ownerAddress,
  initialPage = [],
  cardMarketComponent,
}: NFTGridProps) {
  const {
    data: items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useTokensQuery({
    contractAddress,
    ownerAddress,
    pageSize: 9,
    initialData: initialPage,
  })

  return (
    <Stack gap="x14" pb="x10">
      <Grid gap="x4" className={nftGridWrapper}>
        {items.map((nft) => (
          <NFTCard
            key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
            /* @ts-ignore */
            nftData={nft}
            cardMarketComponent={cardMarketComponent}
          />
        ))}
      </Grid>
      {!isReachingEnd && (
        <Flex justify="center">
          <Button
            variant="secondary"
            size="lg"
            borderRadius="round"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Stack>
  )
}
