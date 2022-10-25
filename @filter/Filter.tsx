import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Box, Flex, Grid, Stack, StackProps } from '@zoralabs/zord'

import {
  filterOpen,
  filterWrapper,
  filterWrapperContainer,
  openFilterWrapper,
} from './CollectionsFilter.css'
import { FilterHeader } from './FilterHeader'
import { FilterResultsLoading } from './FilterResultsLoading'
import { FilterSidebar } from './FilterSidebar'
import { NoFilterResults } from './NoFilterResults'
import { SelectedFilters } from './SelectedFilters'
import { SortDropdown } from './SortDropdown'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

interface FilterProps extends StackProps {
  grid?: JSX.Element
  initialPage?: NFTObject[]
}

export function Filter({ grid, className, ...props }: FilterProps) {
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
    <Stack className={className} {...props}>
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
