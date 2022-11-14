import { HorizontalMenu, HorizontalMenuProps } from 'components'

import { useCollectionFilters } from '@filter'
import { Stack, color } from '@zoralabs/zord'

export function CollectionActivityHeader() {
  const {
    filterStore: { filters, setMarketStatus },
  } = useCollectionFilters()

  const items: HorizontalMenuProps['items'] = [
    {
      id: null,
      label: 'NFTs',
      handler: () => setMarketStatus(null),
    },
    {
      id: 'buy-now',
      label: 'Active Sales',
      handler: () => setMarketStatus('buy-now'),
    },
    {
      id: 'buy-now-completed',
      label: 'Completed Sales',
      handler: () => setMarketStatus('buy-now-completed'),
    },
  ]

  return (
    <Stack
      mt={{
        '@initial': 'x0',
        '@1024': 'x6',
      }}
    >
      <HorizontalMenu
        items={items}
        useCustomHandler
        currentId={filters?.marketStatus}
        style={{
          borderBottom: `1px solid ${color.background2}`,
        }}
      />
    </Stack>
  )
}
