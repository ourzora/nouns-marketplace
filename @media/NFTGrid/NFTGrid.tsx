import { useEffect } from 'react'
import { Grid, Button, Stack, Flex } from '@zoralabs/zord'
import { useTokensQuery } from '@media/hooks/useTokensQuery'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCard } from '../NFTCard/NFTCard'
import { NFTGridLoadMore } from './NFTGridLoadMore'
import { nftGridWrapper } from '../NftMedia.css'

export type NFTGridProps = {
  contractAddress?: string[]
  ownerAddress?: string
  initialPage?: NFTObject[]
}

export function NFTGrid({
  contractAddress,
  ownerAddress,
  initialPage = [],
}: NFTGridProps) {
  const {
    data: items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useTokensQuery({
    contractAddress: contractAddress ? contractAddress[0] : undefined,
    ownerAddress,
    initialData: initialPage,
    /*
    sort: sortMethodToSortParams(filters.sortMethod, filters.marketStatus),
    filter: {
      ...marketTypeToFilterParams(filters.marketStatus),
      ...priceRangeToQueryParams(filters.priceRange),
      mediaType: filters.mediaType,
      ...attributesToFilterParams(filters.collectionAttributes),
    },
    */
  })

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
        {/*!isReachingEnd && (
          <Flex justify="center">
            <Button
              variant="secondary"
              size="lg"
              borderRadius="round"
              onClick={handleLoadMore}
              loading={isValidating}
            >
              Load More
            </Button>
          </Flex>
        )*/}
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
