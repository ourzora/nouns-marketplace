import { HomePageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking, DaoTable } from 'compositions'
import { collectionAddresses } from 'constants/collection-addresses'
import * as styles from 'styles/styles.css'
import { SWRConfig } from 'swr'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useNounsDaos } from 'hooks/useNounsDaos'

import React from 'react'
import { TypeSafeDao } from 'validators/dao'

import * as Sentry from '@sentry/react'
import { zdk, zoraApiFetcher } from '@shared'
import { CollectionSortKey, SortDirection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Grid } from '@zoralabs/zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { fallback: CollectionParsed; daos: TypeSafeDao[] }) {
  // disable client-side refetch of collection agg stat in order to stop overloading backend
  // const { data } = useSWR('collections', collectionsService)
  const clientDaos = useNounsDaos()

  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <PageWrapper direction="column" gap="x6" align="center">
        <Seo />
        <Grid
          px={{ '@initial': 'x4', '@1024': 'x8' }}
          gap="x2"
          className={styles.pageGrid}
          justify="center"
        >
          <HomePageHeader
            headline="The Nouns Marketplace"
            mt={{ '@initial': 'x6', '@1024': 'x24' }}
            mb={{ '@initial': 'x8', '@1024': 'x24' }}
          />
          {props.daos?.length > 0 ? (
            <DaoTable daos={clientDaos || props.daos} className={styles.homepageTable} />
          ) : null}
          <CollectionRanking
            collections={props.fallback}
            className={styles.homepageTable}
          />
        </Grid>
      </PageWrapper>
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  try {
    const data = await zdk.collections({
      where: { collectionAddresses: collectionAddresses },
      sort: { sortDirection: SortDirection.Asc, sortKey: CollectionSortKey.None },
    })

    const daos = await zoraApiFetcher(NOUNS_DAOS_QUERY)

    const collections = data.collections

    return {
      props: {
        fallback: collections?.nodes ?? null,
        daos: daos?.nouns?.nounsDaos?.nodes ?? null,
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

export default Home
