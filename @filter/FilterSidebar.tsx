import { Button } from 'components/Button'

import { useRef, useState } from 'react'

import { useCollectionFilters } from '@filter/providers'
import { marketStatusOptions, mediaTypeOptions, ownerStatusOptions } from '@filter/state'
import { Modal, ModalContent, useModal } from '@modal'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@shared'
import { Box, Flex, Heading, Icon, Stack } from '@zoralabs/zord'

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

export function FilterSidebar() {
  const { requestClose } = useModal()

  const {
    filterStore: {
      showFilters,
      setMarketStatus,
      setMediaType,
      setOwnerStatus,
      filters,
      toggleShowFilters,
    },
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

  const [hasScrolled, setHasScrolled] = useState(false)
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)

  useScrollPosition(
    ({ currPos }) => {
      setHasScrolled(currPos.y > 4)
    },
    [],
    // @ts-ignore-next-line
    childRef,
    false,
    10,
    parentRef
  )

  const { isLarge } = useWindowWidth()

  const sidebarComposition = (
    <Stack
      gap="x2"
      w="100%"
      pb="x8"
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
        {contractAddress && useCollectionProperties && (
          <FilterProperties collectionAddress={contractAddress} />
        )}
        {useCollectionSearch && !contractAddress ? <CollectionsFilterList /> : null}
        {useSidebarClearButton ? (
          <ClearFilters
            w="100%"
            display={{
              '@initial': 'none',
              '@1024': 'block',
            }}
          />
        ) : null}
      </Box>
    </Stack>
  )

  const sideBarMobile = (
    <Modal open={showFilters} onOpenChange={requestClose}>
      <ModalContent
        title="modal"
        showClose={false}
        padding="x0"
        modalContentOverrides={filterSidebarModalContent}
        modalBackgroundOverrides={filterSidebarModalBackground}
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
          {sidebarComposition}
          <MobileFiltersFooter />
        </Stack>
      </ModalContent>
    </Modal>
  )

  return (
    <>
      {isLarge ? (
        <Box h="100%" w="100%" position="sticky" display={showFilters ? 'block' : 'none'}>
          <FilterHeader />
          <Box
            position="relative"
            className={[
              sideBarSeparator,
              {
                [filterSidebarScrolled]: hasScrolled,
              },
            ]}
          />
          {sidebarComposition}
        </Box>
      ) : (
        sideBarMobile
      )}
    </>
  )
}
