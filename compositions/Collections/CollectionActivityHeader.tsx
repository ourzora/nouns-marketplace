import { useCallback, useEffect, useState } from 'react'
import { Flex, Separator, Stack, Button } from '@zoralabs/zord'
import { collectionActivityButton } from './Collections.css'
import { useCollectionFilters, MarketStatusFilter } from '@filter'

export function CollectionActivityHeader() {
  const {
    filterStore: { filters, setMarketStatus },
  } = useCollectionFilters()

  return (
    <Stack mt="x6">
      <Flex gap="x6" justify="center">
        <Button
          variant="unset"
          className={[
            filters?.marketStatus === null && 'active',
            collectionActivityButton,
          ]}
          onClick={() => setMarketStatus(null)}
        >
          NFTs
        </Button>
        <Button
          variant="unset"
          className={[
            filters?.marketStatus === 'buy-now' && 'active',
            collectionActivityButton,
          ]}
          onClick={() => setMarketStatus('buy-now')}
        >
          Active Sales
        </Button>
        <Button
          variant="unset"
          className={[
            filters?.marketStatus === 'buy-now-completed' && 'active',
            collectionActivityButton,
          ]}
          onClick={() => setMarketStatus('buy-now-completed')}
        >
          Completed Sales
        </Button>
      </Flex>
      <Separator />
    </Stack>
  )
}
