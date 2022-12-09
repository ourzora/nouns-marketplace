import { HomePageHeader, PageWrapper, Seo } from 'components'
import { DaoTable } from 'compositions'
import { DAO_PAGE_LIMIT } from 'constants/pagination'
import * as styles from 'styles/styles.css'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useNounsDaos } from 'hooks/useNounsDaos'

import React, { useCallback, useMemo, useState } from 'react'
import { TypeSafeDao } from 'validators/dao'

import * as Sentry from '@sentry/react'
import { zoraApiFetcher } from '@shared'
import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Button, Eyebrow, Grid } from '@zoralabs/zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { daos: TypeSafeDao[] }) {
  const [paginationCursor, setPaginationCursor] = useState<string>('')
  const { daos: clientDaos, pageInfo } = useNounsDaos({
    limit: DAO_PAGE_LIMIT,
    after: paginationCursor,
  })
  const daos = useMemo(() => clientDaos ?? props.daos, [clientDaos, props.daos])
  const hasDaos = useMemo(() => daos?.length > 0, [daos])

  const pageNext = useCallback(() => {
    pageInfo?.endCursor && setPaginationCursor(pageInfo?.endCursor)
  }, [pageInfo?.endCursor])

  console.log('DAOS', daos, daos.length)
  console.log('AFTER', pageInfo?.endCursor)

  return (
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
        {hasDaos && <DaoTable daos={daos} className={styles.homepageTable} />}
      </Grid>

      {hasDaos && (
        <>
          {pageInfo?.hasNextPage ? (
            <Button onClick={pageNext}>Load More DAOs</Button>
          ) : (
            <Eyebrow>All Daos Loaded</Eyebrow>
          )}
        </>
      )}
    </PageWrapper>
  )
}

export async function getServerSideProps() {
  try {
    const daos = await zoraApiFetcher(NOUNS_DAOS_QUERY, { limit: DAO_PAGE_LIMIT })

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
