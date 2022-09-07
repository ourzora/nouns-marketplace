import { CollectionAttribute } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Accordion, Box, InputField, Stack } from '@zoralabs/zord'
import React, { useState } from 'react'
import { attributeBox } from './CollectionsFilter.css'
import { FilterPropertySelect } from './FilterPropertySelect'

const FilterAttributes = ({ property }: any) => {
  const [filter, setFilter] = useState<string>('')
  return (
    <>
      <Accordion label={property.traitType ? property.traitType : ''}>
        <Box py="x2" px="x1">
          <InputField
            icon="Search"
            name="search"
            placeholder="Search"
            value={filter}
            /* @ts-ignore */
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
        <Box className={attributeBox} mb="x4">
          <Stack gap="x5">
            {property.valueMetrics
              .filter((vm) => vm.value.includes(filter) || filter === '')
              .map((valueMetric) => (
                <FilterPropertySelect
                  key={valueMetric.value}
                  traitType={property.traitType || ''}
                  valueMetric={valueMetric}
                />
              ))}
          </Stack>
        </Box>
      </Accordion>
    </>
  )
}

export default FilterAttributes
