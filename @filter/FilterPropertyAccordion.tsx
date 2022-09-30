import { Accordion, Box, InputField, Stack } from '@zoralabs/zord'
import React, { useState } from 'react'
import { attributeSelectWrapper } from './CollectionsFilter.css'
import { FilterPropertySelect } from './FilterPropertySelect'

// The minimum amount of properties to display an search input.
const PROPERTY_MINIMUM = 7

const FilterPropertyAccordion = ({ property }: any) => {
  const [query, setQuery] = useState<string>('')
  return (
    <>
      <Accordion label={property.traitType ? property.traitType : ''}>
        {property.valueMetrics.length >= PROPERTY_MINIMUM ? (
          <Box py="x2" px="x1">
            <InputField
              icon="Search"
              name="search"
              placeholder={`Search ${property.traitType.toLowerCase()}...`}
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          </Box>
        ) : null}
        <Stack gap="x2" className={attributeSelectWrapper} mb="x4" px="x1">
          {property.valueMetrics
            .filter(
              (vm: { value: string }) =>
                vm.value.toLowerCase().includes(query.toLowerCase()) || query === ''
            )
            .map((valueMetric) => (
              <FilterPropertySelect
                key={valueMetric.value}
                traitType={property.traitType || ''}
                valueMetric={valueMetric}
              />
            ))}
        </Stack>
      </Accordion>
    </>
  )
}

export default FilterPropertyAccordion
