import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Grid, Stack, StackProps } from '@zord'

import { FilterGridHeader, FilterHeader, FilterResultsLoading, FilterSidebar } from './'
import * as styles from './CollectionsFilter.css'
import { NoFilterResults } from './NoFilterResults'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

interface FilterProps extends StackProps {
  initialPage?: NFTObject[]
}

export function Filter({ children, className, ...props }: FilterProps) {
  const {
    filterStore: { showFilters },
    items,
    isValidating,
    isEmpty,
    enableSidebarFilter,
  } = useCollectionFilters()

  return (
    <Stack className={className} {...props}>
      <FilterHeader />
      <Grid
        w="100%"
        position="sticky"
        gap="x8"
        className={[
          'zora-collectionsFilterWrapperContainer',
          styles.filterWrapperContainer,
          showFilters && styles.filterOpen,
        ]}
      >
        {enableSidebarFilter && <FilterSidebar />}
        <Stack>
          <FilterGridHeader />
          {items.length ? (
            children
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
