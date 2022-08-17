import { Button, Icon, PopUp, Stack, Text } from '@zoralabs/zord'
import { useKeyPress, useClickOutside } from '@shared'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { activityButton } from './CollectionsFilter.css'
import { useCollectionFilters } from './providers'
import { sortMethodOptions } from './state/filterStore'

export function SortDropdown() {
  const dropdownRef = useRef(null)
  const [open, setOpen] = useState<boolean>(false)
  const [dropdownEnabled, setDropdownEnabled] = useState<boolean>(true)
  useKeyPress('Escape', open, () => setOpen(false))

  const {
    hasActiveMarkets,
    filterStore: {
      setSortMethod,
      filters: { sortMethod, marketStatus },
    },
  } = useCollectionFilters()

  const activeSortMethods = useMemo(
    // Show 'Ending Soon' option for live auctions only
    // @BJ todo: can we also filter out options based on whether the user has markets relevant to HIGHEST/LOWEST PRICE?
    () => {
      let activeOptions = hasActiveMarkets
        ? sortMethodOptions
        : sortMethodOptions.filter(
            (method) =>
              method.value !== 'highest-price' && method.value !== 'lowest-price'
          )

      activeOptions =
        marketStatus !== 'live'
          ? activeOptions.filter((method) => method.value !== 'ending-soon')
          : activeOptions

      return activeOptions
    },
    [hasActiveMarkets, marketStatus]
  )

  const openDropdown = useCallback(
    () => dropdownEnabled && setOpen(true),
    [dropdownEnabled]
  )

  const closeDropdown = useCallback(() => {
    setOpen(false)
    setDropdownEnabled(false)
  }, [])
  useClickOutside(dropdownRef, closeDropdown)

  const activitySelectHandler = useCallback(
    (option) => {
      setSortMethod(option)
      closeDropdown()
    },
    [setSortMethod, closeDropdown]
  )

  useEffect(() => {
    // Don't re-open when clicking the button to close
    const timeout = setTimeout(() => {
      setDropdownEnabled(true)
    }, 0.3 * 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [dropdownEnabled])

  const selectedOption = useMemo(
    () => sortMethodOptions.find((option) => option.value === sortMethod)?.label,
    [sortMethod]
  )

  return (
    <PopUp
      padding="x2"
      open={open}
      trigger={
        <Button
          variant="secondary"
          borderRadius="round"
          size="sm"
          icon="ChevronDown"
          onClick={openDropdown}
          className={['sort-dropdown', activityButton]}
        >
          {selectedOption}
        </Button>
      }
    >
      <Stack aria-label="Sort Dropdown" w="x64">
        {activeSortMethods.map((option) => (
          <Button
            variant="ghost"
            w="100%"
            display="flex"
            justify="space-between"
            style={{
              whiteSpace: 'nowrap',
            }}
            key={option.value}
            onClick={() => activitySelectHandler(option.value)}
          >
            <Text as="span" pr="x10">
              {option.label}
            </Text>
            {option.value === sortMethod && <Icon id="Plus" size="sm" />}
          </Button>
        ))}
      </Stack>
    </PopUp>
  )
}
