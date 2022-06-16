import {
  filterSidebar,
  filterSidebarScrolled,
  sideBarSeparator,
} from './CollectionsFilter.css'
import { CollectionsFilterList } from './CollectionsFilterList'
import { FilterHeader } from './FilterHeader'
import { FilterOptions } from './FilterOptions'
import { FilterPriceRange } from './FilterPriceRange'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import {
  marketStatusOptions,
  mediaTypeOptions,
  useCollectionFilters,
} from '@next/providers/CollectionFilterProvider'
import { Box, Stack } from '@zoralabs/zord'
import { useRef, useState } from 'react'
import { FilterProperties } from './FilterProperties'

export function FilterSidebar({
  itemCount = 0,
  contractAddress,
}: {
  itemCount?: number
  contractAddress?: string
  ownerAddress?: string
}) {
  const {
    filterStore: { showFilters, setMarketStatus, setMediaType, filters },
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
      <FilterHeader itemCount={itemCount} />
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
        pr="x8"
        position="absolute"
        className={[filterSidebar, 'zora-filterSidebar']}
        ref={parentRef}
      >
        <Box position="relative" ref={childRef}>
          <FilterOptions
            label="Market Status"
            options={marketStatusOptions}
            selectedOption={filters.marketStatus}
            setOption={setMarketStatus}
            showCheckbox
          />
          {/*{ownerAddress && (*/}
          {/*  <FilterOptions*/}
          {/*    label="Owner Status"*/}
          {/*    options={ownerStatusOptions}*/}
          {/*    selectedOption={filters.ownerStatus[0]}*/}
          {/*    setOption={setOwnerStatus}*/}
          {/*    showCheckbox*/}
          {/*  />*/}
          {/*)}*/}
          <FilterOptions
            label="Media Type"
            options={mediaTypeOptions}
            selectedOption={filters.mediaType}
            setOption={setMediaType}
            showCheckbox
          />
          <FilterPriceRange />
          {contractAddress ? (
            <FilterProperties collectionAddress={contractAddress} />
          ) : (
            <CollectionsFilterList />
          )}
        </Box>
      </Stack>
    </Box>
  )
}
