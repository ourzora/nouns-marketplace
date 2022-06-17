import { Box, Flex, Grid, Stack } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { SortDropdown } from './SortDropdown'
import {
  filterOpen,
  filterWrapper,
  filterWrapperContainer,
  openFilterWrapper,
} from './CollectionsFilter.css'
import { FilterHeader } from './FilterHeader'
import { FilterSidebar } from './FilterSidebar'
import { SelectedFilters } from './SelectedFilters'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

export function Filter({
  grid,
  itemCount = 0,
  contractAddress,
  ownerAddress,
}: {
  grid?: JSX.Element
  itemCount?: number
  contractAddress?: string
  ownerAddress?: string
  initialPage?: NFTObject[]
}) {
  const {
    filterStore: { showFilters },
  } = useCollectionFilters()

  return (
    <Stack>
      {!showFilters && (
        <FilterHeader itemCount={itemCount}>
          <>
            <SelectedFilters />
            <SortDropdown />
          </>
        </FilterHeader>
      )}
      <Grid
        w="100%"
        position="sticky"
        className={[
          filterWrapperContainer,
          'zora-collectionsFilterWrapperContainer',
          {
            [filterOpen]: showFilters,
          },
        ]}
      >
        <Box
          position="sticky"
          top="x0"
          w="100%"
          className={[
            filterWrapper,
            'zora-collectionFilterWrapper',
            {
              [openFilterWrapper]: showFilters,
            },
          ]}
        >
          <FilterSidebar ownerAddress={ownerAddress} />
        </Box>
        <Stack>
          {showFilters && (
            <Flex justify="space-between" align="center">
              <SelectedFilters />
              <SortDropdown />
            </Flex>
          )}
          {grid}
        </Stack>
      </Grid>
    </Stack>
  )
}
