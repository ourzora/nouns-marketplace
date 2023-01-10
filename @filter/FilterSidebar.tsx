import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { useCollectionFilters } from '@filter/providers'
import { marketStatusOptions, mediaTypeOptions, ownerStatusOptions } from '@filter/state'
import { Modal, ModalContent, useModal } from '@modal'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useWindowWidth } from '@shared'
import { Box, Button, Flex, Heading, Icon, Separator, Stack } from '@zord'

import { ClearFilters } from './ClearFilters'
import * as styles from './CollectionsFilter.css'
import { CollectionsFilterList } from './CollectionsFilterList'
import { FilterHeader } from './FilterHeader'
import { FilterOptions } from './FilterOptions'
import { FilterOwnerCollections } from './FilterOwnerCollections'
import { FilterPriceRange } from './FilterPriceRange'
import { FilterProperties } from './FilterProperties'
import { MobileFiltersFooter } from './MobileFiltersFooter'
import { FILTER_SCROLL_DETECTION_THRESHOLD } from './constants'

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
    collectionPropertiesConfig,
    enableSidebarClearButton,
  } = useCollectionFilters()

  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  useScrollPosition(
    ({ currPos }) => {
      setHasScrolled && setHasScrolled(currPos.y > FILTER_SCROLL_DETECTION_THRESHOLD)
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
      className={[styles.filterSidebar, 'zora-filterSidebar']}
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
        {contractAddress && collectionPropertiesConfig?.enabled && (
          <FilterProperties collectionAddress={contractAddress} />
        )}
        {/* {enableCollectionSearch && !contractAddress &&  */}
        <CollectionsFilterList />
        {/* } */}
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
        modalContentOverrides={styles.filterSidebarModalContent}
        modalBackgroundOverrides={styles.filterSidebarModalBackground}
        fullscreen
      >
        <Stack px="x6" pt="x6">
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
    <Box
      position="sticky"
      top="x0"
      w="100%"
      className={[
        'zora-collectionFilterWrapper',
        styles.filterWrapper,
        showFilters && styles.openFilterWrapper,
      ]}
    >
      {isLarge ? (
        <Box h="100%" w="100%" position="sticky" display={showFilters ? 'block' : 'none'}>
          {enableFilterToggleButton && <FilterHeader />}
          <Box
            position="relative"
            mt={enableFilterToggleButton ? 'x0' : 'x8'}
            className={[
              styles.sideBarSeparator,
              hasScrolled && styles.filterSidebarScrolled,
            ]}
          />
          <FilterSidebarContents setHasScrolled={setHasScrolled} />
        </Box>
      ) : (
        <FilterSidebarMobile />
      )}
    </Box>
  )
}
