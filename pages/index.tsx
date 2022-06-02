import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { Seo } from 'components/Seo'
import { Homepage } from 'templates/Homepage'

/* @ts-ignore */
const Home: NextPage = () => {
  return (
    <PageWrapper direction="column">
      <Seo />
      <Homepage />
    </PageWrapper>
  )
}

export default Home
