import { useCallback } from 'react'

import { Flex, Heading, Stack } from '@zord'

import { FilterOptionButton } from './FilterOptionButton'

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
    <Stack gap="x4">
      <Heading size="sm">{label}</Heading>
      <Flex gap="x2" wrap="wrap">
        {options.map((option: any) => (
          <FilterOptionButton
            key={option.value}
            label={option.label}
            showCheckbox={showCheckbox}
            useBorder={false}
            checked={option.value === selectedOption}
            onClick={() => optionHandler(option.value)}
          />
        ))}
      </Flex>
    </Stack>
  )
}
