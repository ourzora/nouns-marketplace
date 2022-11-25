import { Button } from 'components/Button'

import { useCollectionFilters } from '@filter/providers'
import { ETH_CURRENCY_SHIM } from '@shared'
import { Box, Label, Stack } from '@zoralabs/zord'

import { PriceRangeSelector } from './PriceRangeSelector'

export function FilterPriceRange() {
  const {
    filterStore: { setPriceRange, priceRangeSelection, invalidPriceRange },
    enablePriceRange,
  } = useCollectionFilters()

  return (
    <Stack gap="x4">
      <Label className="zord-attributesHeading" size="lg">
        Price
      </Label>
      <PriceRangeSelector
        onSelect={priceRangeSelection}
        currencyOptions={[ETH_CURRENCY_SHIM]}
      />
      <Button variant="outline" disabled={invalidPriceRange} onClick={setPriceRange}>
        Apply
      </Button>
    </Stack>
  )
}
