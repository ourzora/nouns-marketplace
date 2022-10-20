import { Button } from 'components/Button'

import { useMemo } from 'react'

import { isAddressMatch, shortenAddress } from '@shared'
import { numberFormatter } from '@shared'
import { Zorb } from '@zora-brand'
import { Box, Flex, Stack, Text, mixins } from '@zoralabs/zord'

import {
  collectionBlock,
  collectionBlockContent,
  collectionBlockMeta,
  textSmall,
} from './CollectionsFilter.css'
import { FilterProperties } from './FilterProperties'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

export function FilterCollectionListItem({
  tokenAddress,
  tokenName,
  count,
}: {
  tokenAddress: string
  tokenName?: string | null
  count?: number
}) {
  const {
    useCollectionProperties,
    filterStore: {
      setTokenContracts,
      filters: { tokenContracts },
    },
  } = useCollectionFilters()

  const isSelected = useMemo(
    () => tokenContracts && isAddressMatch(tokenContracts, tokenAddress),
    [tokenAddress, tokenContracts]
  )

  // DAIN TODO: fix hover state styling
  return (
    <Stack gap="x1">
      <Button variant="unset" onClick={() => setTokenContracts(tokenAddress)}>
        <Flex
          align="center"
          justify="space-between"
          position="relative"
          className={[collectionBlock, 'zora-collectionListItem']}
          pt="x1"
          pb="x1"
          w="100%"
        >
          <Flex w="100%" gap="x3" className={collectionBlockContent}>
            <Box>
              <Zorb size={48} address={tokenAddress} />
            </Box>
            <Flex
              direction="column"
              className={[
                collectionBlockMeta,
                'zora-collectionListMeta',
                mixins({ ellipsis: true }),
              ]}
            >
              <Box className={mixins({ ellipsis: true })}>
                <Text variant="label-sm" className={mixins({ ellipsis: true })}>
                  {tokenName || shortenAddress(tokenAddress)}
                </Text>
              </Box>
              {count ? (
                <Text variant="paragraph-xs" color="text3">
                  {numberFormatter(count)} item{count !== 1 ? 's' : ''}
                </Text>
              ) : null}
            </Flex>
          </Flex>
          {isSelected && (
            <Text mr="x4" className={[textSmall, collectionBlockContent]}>
              Clear
            </Text>
          )}
        </Flex>
      </Button>
      {isSelected && useCollectionProperties && (
        <FilterProperties collectionAddress={tokenAddress} />
      )}
    </Stack>
  )
}
