import { Button, Flex } from '@zoralabs/zord'
import { useCallback, useMemo } from 'react'

import { textButton, textSmall } from './CollectionsFilter.css'
import { FilterOptionButton } from './FilterOptionButton'
import { SelectedCollection } from './SelectedCollection'
import { SelectedPriceRange } from './SelectedPriceRange'
import { FILTER_HEADER_HEIGHT } from '@filter/constants'
import { useCollectionFilters } from '@filter/providers'
import { marketStatusOptions, mediaTypeOptions, ownerStatusOptions } from '@filter/state'
import {
  MarketStatusFilter,
  MediaTypeFilter,
  OwnerStatusFilter,
  SelectOption,
  Status,
} from '@filter/typings'

/* Reusable - but not sure how to pass dynamic argument type ie. MarketStatusFilter
/* @ts-ignore */
const selectedOptions = (status: Status[], options: SelectOption[]) =>
  status.map((statusItem) => {
    const filteredStatus = options.find((option) => option.value === statusItem)
    return {
      value: filteredStatus?.value,
      label: filteredStatus?.label,
    }
  })

export function SelectedFilters() {
  const {
    filterStore: {
      filters,
      filters: { marketStatus, mediaType, ownerStatus, tokenContracts },
      hasFilters,
      setMarketStatus,
      setMediaType,
      setOwnerStatus,
      showFilters,
      clearFilters,
    },
  } = useCollectionFilters()

  const allOptions = useMemo(() => {
    return [
      {
        label: 'marketStatus',
        selectedOption: marketStatus,
        selections: selectedOptions([marketStatus], marketStatusOptions),
      },
      {
        label: 'mediaType',
        selectedOption: mediaType,
        selections: selectedOptions([mediaType], mediaTypeOptions),
      },
      {
        label: 'ownerStatus',
        selectedOption: ownerStatus[0],
        selections: selectedOptions(ownerStatus, ownerStatusOptions),
      },
    ]
  }, [marketStatus, mediaType, ownerStatus])

  const toggleOptionHandler = useCallback(
    (type: string, selection: string) => {
      if (type === 'marketStatus') {
        setMarketStatus(selection as MarketStatusFilter)
      } else if (type === 'mediaType') {
        setMediaType(selection as MediaTypeFilter)
      } else if (type === 'ownerStatus') {
        setOwnerStatus(selection as OwnerStatusFilter)
      }
    },
    [setMarketStatus, setMediaType, setOwnerStatus]
  )

  if (!filters && !showFilters) {
    return null
  }

  return (
    <Flex
      position="relative"
      align="center"
      justify="space-between"
      w="100%"
      style={{ height: FILTER_HEADER_HEIGHT }}
      pl={`${showFilters ? 'x0' : 'x2'}`}
      display={{
        '@initial': 'none',
        '@1024': 'flex',
      }}
    >
      <Flex align="center" gap="x2">
        <Flex>
          {allOptions.map((options) => {
            return (
              <Flex align="center" key={options.label}>
                {options.selections.map((option, idx) => (
                  <FilterOptionButton
                    key={idx}
                    label={option.label}
                    showCheckbox={false}
                    showCloseIcon
                    useBorder
                    rightPad
                    onClick={() => toggleOptionHandler(options.label, option.value)}
                  />
                ))}
              </Flex>
            )
          })}
          <SelectedCollection tokenAddress={tokenContracts} />
          <SelectedPriceRange />
        </Flex>
        {hasFilters && (
          <Button
            variant="unset"
            className={[textButton, textSmall]}
            color="primary"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
