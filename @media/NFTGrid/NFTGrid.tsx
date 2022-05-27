import { Grid, Button, Stack } from '@zoralabs/zord/elements'
import { useTokensQuery } from '@media/hooks/useTokensQuery'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCard } from '../NFTCard/NFTCard'
import { nftGridWrapper } from '../NftMedia.css'
import { useMemo } from 'react'

export type NFTGridProps = {
  contractAddress?: string
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
    pageSize: 20,
    initialData: initialPage,
  })

  const showObserver = useMemo(
    () => !isReachingEnd && !isValidating,
    [!isReachingEnd, isValidating]
  )

  return (
    <Stack gap="x4" pb="x4">
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
      <Button onClick={handleLoadMore}>Load More</Button>
      {/*showObserver &&
        <> 
          {!isValidating && (
            <LoadMoreObserver
              position="absolute"
              bottom="x0"
              left="x0"
              h="x2"
              w="100%"
              handleVisible={handleLoadMore}
            />
          )}
          {isValidating && (
            <Flex justify="center" py="x4" aria-hidden>
              <Icon key="spinner" id="Spinner" color="primary" size="lg" />
            </Flex>
          )}
        </>
      */}
    </Stack>
  )
}
