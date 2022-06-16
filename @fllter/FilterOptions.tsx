import { filterOptionsWrapper } from './CollectionsFilter.css'
import { FilterOptionButton } from './FilterOptionButton'
import { Accordion, Box, Flex } from '@zoralabs/zord'
import { useCallback } from 'react'

export interface FilterOption {
  label: string
  value: string | null
}

export interface FilterOptionsProps {
  options: FilterOption[]
  selectedOption?: any
  showCheckbox?: boolean
  label?: string
  setOption?: (option: any) => void
}

export function FilterOptions({
  options,
  selectedOption,
  showCheckbox = false,
  label = undefined,
  setOption = () => null,
}: FilterOptionsProps) {
  const optionHandler = useCallback(
    (option) => {
      setOption(option)
    },
    [setOption]
  )

  return (
    <Box className={filterOptionsWrapper}>
      <Accordion label={label}>
        <Flex gap="x2" wrap="wrap" pb="x3">
          {options.map((option: any) => (
            <FilterOptionButton
              key={option.value}
              label={option.label}
              showCheckbox={showCheckbox}
              checked={option.value === selectedOption}
              onClick={() => optionHandler(option.value)}
            />
          ))}
        </Flex>
      </Accordion>
    </Box>
  )
}
