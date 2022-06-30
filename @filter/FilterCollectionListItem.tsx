import { Zorb } from '@zora-brand'
import {
  collectionBlock,
  collectionBlockContent,
  collectionBlockMeta,
  textSmall,
} from './CollectionsFilter.css'
import { FilterProperties } from './FilterProperties'
import { useCollectionFilters } from './providers/CollectionFilterProvider'
import { Button, Flex, Stack, Text, Box } from '@zoralabs/zord'
import { useMemo } from 'react'
import { shortenAddress } from '@shared/utils/format'
import { numberFormatter } from 'utils/numbers'
import { isAddressMatch } from '@shared/utils/validators'

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
          <Flex gap="x3" className={collectionBlockContent}>
            <Box>
              <Zorb size={48} address={tokenAddress} />
            </Box>
            <Flex
              direction="column"
              className={[collectionBlockMeta, 'zora-collectionListMeta']}
            >
              <Box overflowX="hidden">
                <Text style={{ whiteSpace: 'nowrap' }} variant="label-sm">
                  {tokenName || shortenAddress(tokenAddress)}
                </Text>
              </Box>
              {count ? (
                <Text variant="paragraph-xs" color="tertiary">
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
      {isSelected && <FilterProperties collectionAddress={tokenAddress} />}
    </Stack>
  )
}
