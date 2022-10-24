import { Link } from 'components/Link'

import { NFTGridLoadMore } from '@media/NFTGrid/NFTGridLoadMore'
import { nftGridWrapper } from '@media/NftMedia.css'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Flex, Grid, Heading, Icon, Label, Stack } from '@zoralabs/zord'

import { RawDisplayer } from './RawDisplayer'

export type NFTGridProps = {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd: boolean | undefined
  handleLoadMore?: () => void
}

export function NFTGridTestData({
  items,
  isValidating,
  isReachingEnd,
  handleLoadMore,
}: NFTGridProps) {
  return (
    <>
      <Stack gap="x14" pb="x10">
        <Grid gap="x4" className={nftGridWrapper}>
          {items.map((nft) => (
            <Stack
              w="100%"
              overflowX="scroll"
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
            >
              <Stack>
                <Link
                  href={`/test/collections/${nft?.nft?.contract.address}/${nft?.nft?.tokenId}`}
                >
                  <Label>
                    {nft.nft?.contract.name}: {nft.nft?.tokenId}
                  </Label>
                  <Flex align="center" justify="space-between">
                    <Heading size="xs">
                      NAME: {nft.metadata?.name ? nft.metadata?.name : 'undefined'}
                    </Heading>
                    <Icon size="md" id="ArrowRight" />
                  </Flex>
                </Link>
              </Stack>
              <RawDisplayer data={nft} />
            </Stack>
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
