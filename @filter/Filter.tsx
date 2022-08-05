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
import { NoFilterResults } from './NoFilterResults'
import { FilterResultsLoading } from './FilterResultsLoading'

export function Filter({ grid }: { grid?: JSX.Element; initialPage?: NFTObject[] }) {
  const {
    filterStore: { showFilters },
    useSortDropdown,
    items,
    isValidating,
    isEmpty,
    useSidebarFilter,
    getString,
  } = useCollectionFilters()

  return (
    <Stack px="x4">
      {!showFilters && useSidebarFilter && (
        <FilterHeader>
          <>
            <SelectedFilters />
            {useSortDropdown && <SortDropdown />}
          </>
        </FilterHeader>
      )}
      <Grid
        w="100%"
        position="sticky"
        gap="x8"
        className={[
          filterWrapperContainer,
          'zora-collectionsFilterWrapperContainer',
          {
            [filterOpen]: showFilters,
          },
        ]}
      >
        {useSidebarFilter && (
          <Box
            position="sticky"
            top="x0"
            w="100%"
            style={{
              /* @ts-ignore */
              '--filter-offset-mobile': `${getString(
                'FILTER_OPEN_STICKY_OFFSET_MOBILE'
              )}px`,
              '--filter-offset-desktop': `${getString('FILTER_OPEN_STICKY_OFFSET')}px`,
            }}
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
        )}
        <Stack>
          {showFilters && (
            <Flex justify="space-between" align="center">
              <SelectedFilters />
              {useSortDropdown && <SortDropdown />}
            </Flex>
          )}
          {items.length ? (
            grid
          ) : (
            <>
              {isEmpty ? (
                <NoFilterResults noResultsString="NO_FILTER_RESULTS_COPY" />
              ) : isValidating ? (
                <FilterResultsLoading />
              ) : null}
            </>
          )}
        </Stack>
      </Grid>
    </Stack>
  )
}
