import { collectionAddresses } from 'constants/collection-addresses'

import * as Sentry from '@sentry/react'
import { zdk } from '@shared'
import { CollectionSortKey, SortDirection } from '@zoralabs/zdk/dist/queries/queries-sdk'

export async function collectionsService() {
  try {
    const data = await zdk.collections({
      where: { collectionAddresses: collectionAddresses },
      sort: { sortDirection: SortDirection.Asc, sortKey: CollectionSortKey.None },
    })

    const collections = data.collections

    return {
      props: {
        fallback: collections?.nodes,
      },
    }
  } catch (err) {
    Sentry.captureException(err)

    if (err instanceof Error) {
      if (err?.message.includes('404')) {
        return {
          notFound: true,
          revalidate: 60,
        }
      }
      console.warn(err.message)
    }
    throw err
  }
}
