import { Accordion, Box, Button, Stack } from '@zoralabs/zord'
import { filterOptionsWrapper } from './CollectionsFilter.css'
import { PriceRangeSelector } from './PriceRangeSelector'
import { useCollectionFilters } from '@filter/providers'
import { ETH_CURRENCY_SHIM } from '@shared'

export function FilterPriceRange() {
  const {
    filterStore: { setPriceRange, priceRangeSelection, invalidPriceRange },
    usePriceRange,
  } = useCollectionFilters()

  return (
    <Box className={!usePriceRange?.hideBorder && filterOptionsWrapper} pb="x0">
      <Accordion
        label={usePriceRange?.label || 'Price Range'}
        defaultState={usePriceRange?.defaultState}
      >
        <Stack gap="x4" pb="x4">
          <PriceRangeSelector
            onSelect={priceRangeSelection}
            currencyOptions={[ETH_CURRENCY_SHIM]}
          />
          <Button variant="outline" disabled={invalidPriceRange} onClick={setPriceRange}>
            Apply
          </Button>
        </Stack>
      </Accordion>
    </Box>
  )
}
