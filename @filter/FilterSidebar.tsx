import { Button } from 'components/Button'

import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react'

import { useCollectionFilters } from '@filter/providers'
import { marketStatusOptions, mediaTypeOptions, ownerStatusOptions } from '@filter/state'
import { Modal, ModalContent, useModal } from '@modal'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@shared'
import { Box, Flex, Heading, Icon, Separator, Stack } from '@zoralabs/zord'

import { ClearFilters } from './ClearFilters'
import {
  filterSidebar,
  filterSidebarModalBackground,
  filterSidebarModalContent,
  filterSidebarScrolled,
  sideBarSeparator,
} from './CollectionsFilter.css'
import { CollectionsFilterList } from './CollectionsFilterList'
import { FilterHeader } from './FilterHeader'
import { FilterOptions } from './FilterOptions'
import { FilterOwnerCollections } from './FilterOwnerCollections'
import { FilterPriceRange } from './FilterPriceRange'
import { FilterProperties } from './FilterProperties'
import { MobileFiltersFooter } from './MobileFiltersFooter'

export function FilterSidebarContents({
  setHasScrolled,
}: {
  setHasScrolled?: Dispatch<SetStateAction<boolean>>
}) {
  const {
    filterStore: { setMarketStatus, setMediaType, setOwnerStatus, filters },
    ownerAddress,
    contractAddress,
    enableMarketStatus,
    enableOwnerStatus,
    enableMediaTypes,
    enablePriceRange,
    useFilterOwnerCollections,
    enableCollectionSearch,
    useCollectionProperties,
    enableSidebarClearButton,
  } = useCollectionFilters()

  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  useScrollPosition(
    ({ currPos }) => {
      setHasScrolled && setHasScrolled(currPos.y > 4)
    },
    [],
    // @ts-ignore-next-line
    childRef,
    false,
    10,
    parentRef
  )
  return (
    <Stack
      gap="x2"
      w="100%"
      pb="x8"
      position={{ '@initial': 'relative', '@768': 'absolute' }}
      className={[filterSidebar, 'zora-filterSidebar']}
      ref={parentRef}
    >
      <Stack gap="x8" position="relative" ref={childRef}>
        {enablePriceRange && <FilterPriceRange />}
        {enableMarketStatus && (
          <FilterOptions
            label="Market Status"
            options={marketStatusOptions}
            selectedOption={filters.marketStatus}
            setOption={setMarketStatus}
            showCheckbox
          />
        )}
        {enableOwnerStatus && ownerAddress && (
          <FilterOptions
            label="Owner Status"
            options={ownerStatusOptions}
            selectedOption={filters.ownerStatus[0]}
            setOption={setOwnerStatus}
            showCheckbox
          />
        )}
        {enableMediaTypes && (
          <FilterOptions
            label="Media Type"
            options={mediaTypeOptions}
            selectedOption={filters.mediaType}
            setOption={setMediaType}
            showCheckbox
          />
        )}
        {ownerAddress && useFilterOwnerCollections && <FilterOwnerCollections />}
        {contractAddress && useCollectionProperties && (
          <FilterProperties collectionAddress={contractAddress} />
        )}
        {enableCollectionSearch && !contractAddress && <CollectionsFilterList />}
        {enableSidebarClearButton && (
          <Stack gap="x4">
            <Separator />
            <ClearFilters
              w="100%"
              display={{
                '@initial': 'none',
                '@1024': 'block',
              }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export function FilterSidebarMobile() {
  const { requestClose } = useModal()

  const {
    filterStore: { showFilters, toggleShowFilters },
  } = useCollectionFilters()
  return (
    <Modal open={showFilters} onOpenChange={requestClose}>
      <ModalContent
        title="modal"
        showClose={false}
        padding="x0"
        modalContentOverrides={filterSidebarModalContent}
        modalBackgroundOverrides={filterSidebarModalBackground}
        fullscreen
      >
        <Stack px="x4" pt="x8">
          <Flex w="100%" justify="space-between" pb="x6">
            <Heading as="h1" size="sm">
              Filters
            </Heading>
            <Button onClick={toggleShowFilters} variant="unset">
              <Icon id="Close" size="md" />
            </Button>
          </Flex>
          <FilterSidebarContents />
          <MobileFiltersFooter />
        </Stack>
      </ModalContent>
    </Modal>
  )
}

export function FilterSidebar() {
  const {
    enableFilterToggleButton,
    filterStore: { showFilters },
  } = useCollectionFilters()

  const { isLarge } = useWindowWidth()
  const [hasScrolled, setHasScrolled] = useState(false)

  return (
    <>
      {isLarge ? (
        <Box h="100%" w="100%" position="sticky" display={showFilters ? 'block' : 'none'}>
          {enableFilterToggleButton && <FilterHeader />}
          <Box
            position="relative"
            mt={enableFilterToggleButton ? 'x0' : 'x8'}
            className={[
              sideBarSeparator,
              {
                [filterSidebarScrolled]: hasScrolled,
              },
            ]}
          />
          <FilterSidebarContents setHasScrolled={setHasScrolled} />
        </Box>
      ) : (
        <FilterSidebarMobile />
      )}
    </>
  )
}
