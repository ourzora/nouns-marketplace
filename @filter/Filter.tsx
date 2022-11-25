import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Box, Flex, Grid, Stack, StackProps } from '@zoralabs/zord'

import * as styles from './CollectionsFilter.css'
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
    enableSortDropdown,
    enableSelectedFiltersPanel,
    items,
    isValidating,
    isEmpty,
    enableSidebarFilter,
    getString,
  } = useCollectionFilters()

  return (
    <Stack className={className} {...props}>
      {!showFilters && enableSidebarFilter && (
        <FilterHeader>
          <>
            {enableSelectedFiltersPanel && <SelectedFilters />}
            {enableSortDropdown && <SortDropdown />}
          </>
        </FilterHeader>
      )}
      <Grid
        w="100%"
        position="sticky"
        gap="x8"
        className={[
          styles.filterWrapperContainer,
          'zora-collectionsFilterWrapperContainer',
          {
            [styles.filterOpen]: showFilters,
          },
        ]}
      >
        {enableSidebarFilter && (
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
              styles.filterWrapper,
              'zora-collectionFilterWrapper',
              {
                [styles.openFilterWrapper]: showFilters,
              },
            ]}
          >
            <FilterSidebar />
          </Box>
        )}
        <Stack>
          {showFilters && (
            <Flex
              className={styles.gridFilterHeaderPanel}
              align="center"
              justify={
                enableSelectedFiltersPanel && enableSortDropdown
                  ? 'space-between'
                  : 'flex-end'
              }
            >
              {enableSelectedFiltersPanel && <SelectedFilters />}
              {enableSortDropdown && <SortDropdown />}
            </Flex>
          )}
          {items.length ? (
            grid
          ) : (
            <>
              {isEmpty && <NoFilterResults noResultsString="NO_FILTER_RESULTS_COPY" />}
              {isValidating && <FilterResultsLoading />}
            </>
          )}
        </Stack>
      </Grid>
    </Stack>
  )
}
