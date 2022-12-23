import { HomePageHeader, PageWrapper, Seo } from 'components'
import { DaoTable } from 'compositions'
import { DAO_PAGE_LIMIT } from 'constants/pagination'
import * as styles from 'styles/styles.css'
import { NounsDaosQuery } from 'types/zora.api.generated'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useNounsDaos } from 'hooks/useNounsDaos'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeSafeDao } from 'validators/dao'

import * as Sentry from '@sentry/react'
import { zoraApiFetcher } from '@shared'
import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Box, Button, Flex, Grid, Paragraph, Stack } from '@zoralabs/zord'

const DEBUG = true

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { ssrDAOQuery: NounsDaosQuery; daos: TypeSafeDao[] }) {
  const { daos: ssrDAOS, ssrDAOQuery } = props
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [cursorCache, setCursorCache] = useState<string[]>([''])

  const {
    response: daoQueryResponse,
    daos: clientDaos,
    pageInfo,
    // isValidating,
  } = useNounsDaos({
    limit: DAO_PAGE_LIMIT,
    // after: currentCursor,
    after: cursorCache[currentIndex],
    fallbackData: currentIndex === 0 ? ssrDAOQuery : undefined,
  })

  const daos = useMemo(() => clientDaos ?? ssrDAOS, [clientDaos, ssrDAOS])
  const hasDaos = useMemo(() => daos?.length > 0, [daos])
  console.log('DAO RESPONSE', daoQueryResponse)
  console.log('daos.length', daos?.length)
  console.log('daos', daos)

  useEffect(() => {
    if (pageInfo?.endCursor && pageInfo.endCursor !== cursorCache[currentIndex]) {
      const fetchedCursor = pageInfo.endCursor
      let newCursorCache: string[] = cursorCache

      // Add new cursor to pagination cache if it's not already there
      if (!cursorCache.includes(fetchedCursor)) {
        newCursorCache.push(fetchedCursor)
        setCursorCache(newCursorCache)
        console.log('NEXT:', fetchedCursor)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo?.endCursor])

  useEffect(() => console.log(cursorCache), [cursorCache])

  const pagePrev = useCallback(() => {
    setCurrentIndex(currentIndex - 1)
  }, [currentIndex])

  const pageNext = useCallback(() => {
    setCurrentIndex(currentIndex + 1)
  }, [currentIndex])

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

        {hasDaos && <DaoTable daos={daos} className={styles.homepageTable} />}
        {hasDaos && (
          <Stack gap="x1" className={styles.homepageTable}>
            <Flex gap="x2" justify="space-between">
              <Box>
                {currentIndex !== 0 && (
                  <Button onClick={pagePrev} alignSelf="flex-start">
                    Prev {currentIndex === 1 ? 'INITIAL' : cursorCache[currentIndex - 1]}
                  </Button>
                )}
              </Box>
              <Box>
                {pageInfo?.hasNextPage && (
                  <Button onClick={pageNext} alignSelf="flex-end">
                    Next {cursorCache[currentIndex + 1]}
                  </Button>
                )}
              </Box>
            </Flex>
            {DEBUG && (
              <Stack align="center">
                <Stack>
                  {hasDaos &&
                    daos.map((dao) => (
                      <Paragraph key={dao.collectionAddress}>
                        {dao.collectionAddress}
                      </Paragraph>
                    ))}
                </Stack>
                <Paragraph size="sm">cursorCache: [{cursorCache.toString()}]</Paragraph>
                <Paragraph size="sm">{`prev: ${
                  currentIndex === 0 ? 'INITIAL' : cursorCache[currentIndex - 1]
                }`}</Paragraph>
                <Paragraph size="sm">{`current: ${cursorCache[currentIndex]}`}</Paragraph>
                <Paragraph size="sm">{`next: ${
                  cursorCache[currentIndex] + 1
                }`}</Paragraph>
                <Paragraph size="sm">{`daos.length: ${daos?.length}`}</Paragraph>
              </Stack>
            )}
          </Stack>
        )}
      </Grid>
    </PageWrapper>
  )
}

export async function getServerSideProps() {
  try {
    const ssrDAOQuery: NounsDaosQuery = await zoraApiFetcher(NOUNS_DAOS_QUERY, {
      limit: DAO_PAGE_LIMIT,
    })

    return {
      props: {
        ssrDAOQuery,
        daos: ssrDAOQuery?.nouns?.nounsDaos?.nodes ?? null,
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
