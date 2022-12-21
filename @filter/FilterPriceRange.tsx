import { useCollectionFilters } from '@filter/providers'
import { ETH_CURRENCY_SHIM } from '@shared'
import { Button, Label, Stack } from '@zord'

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
        minPlaceholder="From"
        maxPlaceholder="To"
      />
      <Button
        size="md"
        variant="secondary"
        disabled={invalidPriceRange}
        onClick={setPriceRange}
      >
        Apply
      </Button>
    </Stack>
  )
}
