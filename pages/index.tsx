import { HomePageHeader, PageWrapper, Seo } from 'components'
import { DaoTable } from 'compositions'
import * as styles from 'styles/styles.css'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useNounsDaos } from 'hooks/useNounsDaos'

import React, { useMemo } from 'react'
import { TypeSafeDao } from 'validators/dao'

import * as Sentry from '@sentry/react'
import { zoraApiFetcher } from '@shared'
import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Grid } from '@zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { daos: TypeSafeDao[] }) {
  const clientDaos = useNounsDaos({ limit: 30 })
  const hasDaos = useMemo(
    () => props.daos?.length > 0 || clientDaos?.length > 0,
    [clientDaos, props.daos]
  )

  return (
    <PageWrapper direction="column" gap="x6" align="center">
      <Seo />
      <Grid
        px={{ '@initial': 'x4', '@1024': 'x8' }}
        className={styles.pageGrid}
        justify="center"
      >
        <HomePageHeader
          headline="The Nouns Marketplace"
          mt={{ '@initial': 'x6', '@1024': 'x24' }}
          mb={{ '@initial': 'x8', '@1024': 'x24' }}
        />
        {hasDaos && (
          <DaoTable daos={clientDaos || props.daos} className={styles.homepageTable} />
        )}
      </Grid>
    </PageWrapper>
  )
}

export async function getServerSideProps() {
  try {
    const daos = await zoraApiFetcher(NOUNS_DAOS_QUERY, { limit: 30 })

    return {
      props: {
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
