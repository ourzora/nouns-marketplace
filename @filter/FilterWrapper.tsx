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
import { Box, Flex, Grid, Stack } from '@zoralabs/zord'

export function FilterWrapper({
  grid,
}: {
  grid?: JSX.Element
  itemCount?: number
  contractAddress?: string
  ownerAddress?: string
}) {
  const {
    filterStore: { showFilters },
  } = useCollectionFilters()

  return (
    <Stack px="x8">
      {!showFilters && (
        <FilterHeader>
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
          <FilterSidebar />
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
