import { Box, Stack } from '@zoralabs/zord'
import { useRef, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useCollectionFilters } from '@filter/providers'
import { marketStatusOptions, mediaTypeOptions, ownerStatusOptions } from '@filter/state'
import {
  filterSidebar,
  filterSidebarScrolled,
  sideBarSeparator,
} from './CollectionsFilter.css'
import { CollectionsFilterList } from './CollectionsFilterList'
import { FilterHeader } from './FilterHeader'
import { FilterOptions } from './FilterOptions'
import { FilterPriceRange } from './FilterPriceRange'
import { FilterProperties } from './FilterProperties'
import { FilterOwnerCollections } from './FilterOwnerCollections'
import { ClearFilters } from './ClearFilters'

export function FilterSidebar() {
  const {
    filterStore: { showFilters, setMarketStatus, setMediaType, setOwnerStatus, filters },
    ownerAddress,
    contractAddress,
    useMarketStatus,
    useOwnerStatus,
    useMediaTypes,
    usePriceRange,
    useFilterOwnerCollections,
    useCollectionSearch,
    useCollectionProperties,
    useSidebarClearButton,
  } = useCollectionFilters()

  const [scrolled, setScrolled] = useState(false)
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)

  useScrollPosition(
    ({ currPos }) => {
      setScrolled(currPos.y > 4)
    },
    [],
    // @ts-ignore-next-line
    childRef,
    false,
    10,
    parentRef
  )

  return (
    <Box h="100%" w="100%" position="sticky" display={showFilters ? 'block' : 'none'}>
      <FilterHeader />
      <Box
        position="relative"
        className={[
          sideBarSeparator,
          {
            [filterSidebarScrolled]: scrolled,
          },
        ]}
      />
      <Stack
        gap="x2"
        w="100%"
        pb="x8"
        pr={{
          '@initial': 'x4',
          '@1024': 'x4',
        }}
        position="absolute"
        className={[filterSidebar, 'zora-filterSidebar']}
        ref={parentRef}
      >
        <Box position="relative" ref={childRef}>
          {useMarketStatus && (
            <FilterOptions
              label="Market Status"
              options={marketStatusOptions}
              selectedOption={filters.marketStatus}
              setOption={setMarketStatus}
              showCheckbox
            />
          )}
          {useOwnerStatus && ownerAddress && (
            <FilterOptions
              label="Owner Status"
              options={ownerStatusOptions}
              selectedOption={filters.ownerStatus[0]}
              setOption={setOwnerStatus}
              showCheckbox
            />
          )}
          {useMediaTypes && (
            <FilterOptions
              label="Media Type"
              options={mediaTypeOptions}
              selectedOption={filters.mediaType}
              setOption={setMediaType}
              showCheckbox
            />
          )}
          {ownerAddress && useFilterOwnerCollections && <FilterOwnerCollections />}
          {usePriceRange && <FilterPriceRange />}
          {contractAddress && useCollectionProperties ? (
            <FilterProperties collectionAddress={contractAddress} />
          ) : null}
          {useCollectionSearch && !contractAddress ? <CollectionsFilterList /> : null}
          {useSidebarClearButton ? <ClearFilters mt="x2" /> : null}
        </Box>
      </Stack>
    </Box>
  )
}
